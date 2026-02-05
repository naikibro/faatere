import { ApiProperty } from '@nestjs/swagger';

export class DbOperationDetailsDto {
  @ApiProperty({
    description: 'List of executed operations',
    example: ['1770191785802-InitialSchema'],
    required: false,
  })
  executed?: string[];

  @ApiProperty({
    description: 'List of skipped operations',
    example: ['board-user@admin@faatere.pf'],
    required: false,
  })
  skipped?: string[];

  @ApiProperty({
    description: 'List of errors encountered',
    example: [],
    required: false,
  })
  errors?: string[];

  @ApiProperty({
    description: 'Summary of operations',
    example: { created: 1, skipped: 2 },
    required: false,
  })
  summary?: Record<string, number>;
}

export class DbOperationResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    description: 'The type of operation performed',
    example: 'migrate',
    enum: ['migrate', 'seed'],
  })
  operation!: 'migrate' | 'seed';

  @ApiProperty({
    description: 'Details of the operation',
    type: DbOperationDetailsDto,
  })
  details!: DbOperationDetailsDto;

  @ApiProperty({
    description: 'Timestamp of the operation',
    example: '2026-02-05T10:30:00.000Z',
  })
  timestamp!: string;
}
