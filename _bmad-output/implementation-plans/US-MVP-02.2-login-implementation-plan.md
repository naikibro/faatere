# Implementation Plan: US-MVP-02.2 - Login Email/Password

| Metadata | Value |
|----------|-------|
| **User Story** | US-MVP-02.2 |
| **Epic** | E-MVP-02 : Authentification |
| **Priority** | P0 |
| **Status** | Ready for Implementation |
| **Created** | 2026-02-05 |

---

## Executive Summary

This plan details the implementation of the email/password login functionality for Faatere. The solution leverages NestJS with Passport.js strategies for the backend and Next.js 15 with react-hook-form for the frontend. All core dependencies are already installed; we only need to implement the application layer.

---

## Codebase Analysis

### Backend - What Exists
- ✅ NestJS 11 project at `services/backend`
- ✅ User entity with `email`, `passwordHash`, `role`, `isActive` fields
- ✅ TypeORM + PostgreSQL configured
- ✅ JWT dependencies installed (`@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `passport-local`)
- ✅ Bcrypt installed and used in seed
- ✅ JWT configuration in environment (JWT_SECRET, JWT_EXPIRATION=24h, JWT_REFRESH_EXPIRATION=7d)
- ✅ Global validation pipe enabled
- ✅ Swagger/OpenAPI configured with Bearer auth
- ✅ Module/Guard patterns established (see `db-management` module)

### Backend - What's Missing
- ❌ AuthModule, AuthService, AuthController
- ❌ Local Strategy (username/password)
- ❌ JWT Strategy (token validation)
- ❌ JwtAuthGuard, LocalAuthGuard
- ❌ Custom decorators (@CurrentUser, @Public)
- ❌ DTOs (LoginDto, AuthResponseDto)
- ❌ Rate limiting with @nestjs/throttler

### Frontend - What Exists
- ✅ Next.js 15 with App Router at `frontend`
- ✅ react-hook-form + zod installed
- ✅ axios + @tanstack/react-query installed
- ✅ Auth layout `(auth)` with centered styling
- ✅ Button component with CVA variants
- ✅ Tailwind CSS with theme variables
- ✅ Shared types (IUser, UserRole) available
- ✅ Environment config (NEXT_PUBLIC_API_URL)

### Frontend - What's Missing
- ❌ Login page (`/app/(auth)/login/page.tsx`)
- ❌ Form components (Input, Label, FormField)
- ❌ Zod validation schemas
- ❌ API client instance with interceptors
- ❌ Auth hooks (useAuth, useLogin)
- ❌ Auth context/provider
- ❌ Protected route middleware
- ❌ Dashboard page (redirect target)

---

## Implementation Architecture

### Backend Architecture

```
services/backend/src/modules/auth/
├── auth.module.ts              # Module registration
├── auth.controller.ts          # REST endpoints
├── auth.service.ts             # Business logic
├── dto/
│   ├── login.dto.ts            # Input validation
│   ├── auth-response.dto.ts    # Response shape
│   └── index.ts
├── strategies/
│   ├── local.strategy.ts       # Email/password validation
│   ├── jwt.strategy.ts         # JWT token validation
│   └── index.ts
├── guards/
│   ├── local-auth.guard.ts     # Wraps local strategy
│   ├── jwt-auth.guard.ts       # Protects routes
│   └── index.ts
├── decorators/
│   ├── current-user.decorator.ts
│   ├── public.decorator.ts
│   └── index.ts
└── index.ts
```

### Frontend Architecture

```
frontend/src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx        # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Protected layout
│   │   └── page.tsx            # Dashboard home
│   └── providers.tsx           # Auth + Query providers
├── components/
│   └── ui/
│       ├── input.tsx           # Form input
│       ├── label.tsx           # Form label
│       └── form.tsx            # Form wrapper
├── hooks/
│   ├── use-auth.ts             # Auth context hook
│   └── use-login.ts            # Login mutation
├── lib/
│   ├── api.ts                  # Axios instance
│   ├── schemas.ts              # Zod schemas
│   └── auth.ts                 # Token management
└── middleware.ts               # Route protection
```

---

## Detailed Implementation Tasks

### Phase 1: Backend Authentication Core

#### Task 1.1: Create Auth DTOs
**File**: `services/backend/src/modules/auth/dto/login.dto.ts`

```typescript
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(1)
  password: string;
}
```

**File**: `services/backend/src/modules/auth/dto/auth-response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'shared';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ nullable: true })
  tomiteId: string | null;

  @ApiProperty()
  isActive: boolean;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
```

---

#### Task 1.2: Create Auth Service
**File**: `services/backend/src/modules/auth/auth.service.ts`

Key methods:
- `validateUser(email: string, password: string)`: Validates credentials, checks isActive
- `login(user: User)`: Generates JWT access and refresh tokens
- `refreshTokens(refreshToken: string)`: Validates and rotates refresh token

Implementation notes:
- Use bcrypt.compare() for password validation
- Return 401 for invalid credentials
- Return 403 for inactive accounts
- Access token: 24h expiration, includes user id, email, role
- Refresh token: 7 days expiration, stored separately

---

#### Task 1.3: Create Passport Strategies
**File**: `services/backend/src/modules/auth/strategies/local.strategy.ts`

```typescript
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
```

**File**: `services/backend/src/modules/auth/strategies/jwt.strategy.ts`

```typescript
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

---

#### Task 1.4: Create Auth Guards
**File**: `services/backend/src/modules/auth/guards/local-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

**File**: `services/backend/src/modules/auth/guards/jwt-auth.guard.ts`

```typescript
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
```

---

#### Task 1.5: Create Custom Decorators
**File**: `services/backend/src/modules/auth/decorators/current-user.decorator.ts`

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

**File**: `services/backend/src/modules/auth/decorators/public.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

---

#### Task 1.6: Create Auth Controller
**File**: `services/backend/src/modules/auth/auth.controller.ts`

```typescript
import { Controller, Post, UseGuards, Request, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { LoginDto, AuthResponseDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })  // 5 attempts per minute
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 403, description: 'Account disabled' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(req.user);
  }
}
```

---

#### Task 1.7: Create Auth Module
**File**: `services/backend/src/modules/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../entities';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiration') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

---

#### Task 1.8: Install and Configure Throttler
**Command**: `yarn workspace backend add @nestjs/throttler`

**Update**: `services/backend/src/app.module.ts`

```typescript
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,  // 1 minute
      limit: 100,  // 100 requests per minute (global default)
    }]),
    AuthModule,
    // ... other imports
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // ... other providers
  ],
})
export class AppModule {}
```

---

### Phase 2: Frontend Authentication UI

#### Task 2.1: Create Form UI Components
**File**: `frontend/src/components/ui/input.tsx`

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

**File**: `frontend/src/components/ui/label.tsx`

```typescript
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
```

---

#### Task 2.2: Create API Client
**File**: `frontend/src/lib/api.ts`

```typescript
import axios from 'axios';
import { getToken, setToken, clearToken } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**File**: `frontend/src/lib/auth.ts`

```typescript
const TOKEN_KEY = 'faatere_access_token';
const REFRESH_KEY = 'faatere_refresh_token';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
```

---

#### Task 2.3: Create Zod Schemas
**File**: `frontend/src/lib/schemas.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

---

#### Task 2.4: Create Auth Hooks
**File**: `frontend/src/hooks/use-auth.ts`

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from 'shared';
import { getToken, clearToken, isAuthenticated } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  role: UserRole;
  tomiteId: string | null;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token on mount
    const token = getToken();
    if (token) {
      // TODO: Validate token and fetch user
      // For now, we'll rely on the login response
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

**File**: `frontend/src/hooks/use-login.ts`

```typescript
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { setToken, setRefreshToken } from '@/lib/auth';
import { useAuth } from './use-auth';
import { LoginFormData } from '@/lib/schemas';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    tomiteId: string | null;
    isActive: boolean;
  };
}

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      router.push('/dashboard');
    },
  });
}
```

---

#### Task 2.5: Create Login Page
**File**: `frontend/src/app/(auth)/login/page.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginFormData } from '@/lib/schemas';
import { useLogin } from '@/hooks/use-login';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const getErrorMessage = (error: unknown) => {
    if (!error) return null;
    const err = error as { response?: { status: number } };
    if (err.response?.status === 401) return 'Invalid email or password';
    if (err.response?.status === 403) return 'Account is disabled';
    if (err.response?.status === 429) return 'Too many attempts. Please wait.';
    return 'An error occurred. Please try again.';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Sign in to Faatere</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {getErrorMessage(error)}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  );
}
```

---

#### Task 2.6: Create Providers Component
**File**: `frontend/src/app/providers.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { AuthProvider } from '@/hooks/use-auth';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
```

**Update**: `frontend/src/app/layout.tsx` to wrap with Providers

---

#### Task 2.7: Create Dashboard Placeholder
**File**: `frontend/src/app/(dashboard)/layout.tsx`

Protected layout that redirects unauthenticated users.

**File**: `frontend/src/app/(dashboard)/page.tsx`

Simple dashboard page showing user info.

---

#### Task 2.8: Create Route Protection Middleware
**File**: `frontend/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/setup-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for auth token in cookies or redirect to login
  const token = request.cookies.get('faatere_access_token')?.value;

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Testing Strategy

### Backend Tests

1. **Unit Tests** (`auth.service.spec.ts`):
   - validateUser() with valid credentials
   - validateUser() with invalid credentials
   - validateUser() with inactive account
   - login() token generation

2. **Integration Tests** (`auth.controller.spec.ts`):
   - POST /auth/login success
   - POST /auth/login invalid credentials (401)
   - POST /auth/login inactive account (403)
   - Rate limiting (429 after 5 attempts)

### Frontend Tests

1. **Component Tests**:
   - Login form renders correctly
   - Form validation shows errors
   - Submit button disabled while loading

2. **Integration Tests**:
   - Successful login redirects to dashboard
   - Failed login shows error message
   - Rate limit error handling

---

## Acceptance Criteria Checklist

### Backend
- [ ] Endpoint POST /auth/login
- [ ] Validation email format + password required
- [ ] Account active check (isActive === true)
- [ ] Returns JWT access token (24h expiration)
- [ ] Returns refresh token (7 days expiration)
- [ ] Error 401 for invalid credentials
- [ ] Error 403 for disabled account
- [ ] Rate limiting: 5 attempts / minute

### Frontend
- [ ] Page /login with form
- [ ] Client-side validation
- [ ] Error display
- [ ] Redirect to dashboard after login
- [ ] Secure token storage (localStorage)

---

## Implementation Order

1. **Backend Phase 1** (Core Auth)
   - 1.1 Create DTOs
   - 1.2 Create Auth Service
   - 1.3 Create Passport Strategies
   - 1.4 Create Guards
   - 1.5 Create Decorators
   - 1.6 Create Auth Controller
   - 1.7 Create Auth Module
   - 1.8 Configure Throttler

2. **Frontend Phase 2** (Auth UI)
   - 2.1 Create Form Components
   - 2.2 Create API Client
   - 2.3 Create Zod Schemas
   - 2.4 Create Auth Hooks
   - 2.5 Create Login Page
   - 2.6 Create Providers
   - 2.7 Create Dashboard Placeholder
   - 2.8 Create Route Middleware

3. **Phase 3** (Testing & Integration)
   - Write backend unit tests
   - Write backend integration tests
   - Write frontend component tests
   - End-to-end testing

---

## Security Considerations

1. **Password Security**:
   - Passwords hashed with bcrypt (12 salt rounds)
   - Never log or return passwords

2. **Token Security**:
   - JWT signed with strong secret (min 32 chars)
   - Short-lived access tokens (24h)
   - Refresh tokens for session extension

3. **Rate Limiting**:
   - 5 login attempts per minute
   - Prevents brute force attacks

4. **XSS Prevention**:
   - Using localStorage (per PRD note, httpOnly cookies preferred but more complex)
   - Consider migrating to httpOnly cookies in future iteration

5. **CORS**:
   - Already configured in backend

---

## Estimated Effort

| Phase | Tasks | Estimated Hours |
|-------|-------|-----------------|
| Backend Core | 1.1 - 1.8 | 4-6 hours |
| Frontend UI | 2.1 - 2.8 | 4-6 hours |
| Testing | Unit + Integration | 2-3 hours |
| **Total** | | **10-15 hours** |

---

## Dependencies

- ✅ US-MVP-02.1: Migration utilisateurs Bureau (completed - board-users.seed.ts exists)
- ✅ US-MVP-01.4: Setup Backend (completed - NestJS configured)
- ✅ US-MVP-01.5: Setup Frontend (completed - Next.js configured)

---

## Notes

- All auth dependencies are already installed
- JWT configuration exists in environment
- User entity is ready with all required fields
- Follow existing code patterns from db-management module
- Use shared types where available
