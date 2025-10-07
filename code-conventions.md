# Code Conventions

## Project Overview
E-commerce microservices application using NestJS and MongoDB.

---

## General Principles

### Code Style
- Use **TypeScript** with strict mode enabled
- Follow **functional programming** principles where applicable
- Write **self-documenting code** with clear variable and function names
- Keep functions small and focused (single responsibility principle)
- Use **async/await** over promises chains

### File Organization
```
src/
├── modules/
│   └── [feature]/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── dto/
│       ├── entities/
│       ├── interfaces/
│       └── [feature].module.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── utils/
└── config/
```

---

## Naming Conventions

### Files
- **Controllers**: `user.controller.ts`
- **Services**: `user.service.ts`
- **Repositories**: `user.repository.ts`
- **DTOs**: `create-user.dto.ts`, `update-user.dto.ts`
- **Entities/Schemas**: `user.entity.ts` or `user.schema.ts`
- **Interfaces**: `user.interface.ts`
- **Modules**: `user.module.ts`
- **Guards**: `jwt-auth.guard.ts`
- **Interceptors**: `logging.interceptor.ts`
- **Pipes**: `validation.pipe.ts`

### Classes
- **PascalCase** for class names
- Controllers: `UserController`
- Services: `UserService`
- DTOs: `CreateUserDto`, `UpdateUserDto`
- Entities: `User`, `UserSchema`

### Variables & Functions
- **camelCase** for variables and functions
- Use descriptive names: `getUserById`, `calculateTotalPrice`
- Boolean variables: prefix with `is`, `has`, `should`
  - Examples: `isActive`, `hasPermission`, `shouldRetry`

### Constants
- **UPPER_SNAKE_CASE** for constants
- Examples: `MAX_RETRY_ATTEMPTS`, `DEFAULT_PAGE_SIZE`

### Interfaces
- Prefix with `I` (optional but consistent)
- Examples: `IUserRepository`, `IAuthService`

---

## MongoDB Conventions

### Schema Design
```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ 
  timestamps: true,
  collection: 'users'
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  role: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Collection Naming
- Use **plural, lowercase** names: `users`, `products`, `orders`
- Use **timestamps** option for automatic `createdAt` and `updatedAt`

### Field Naming
- Use **camelCase** for field names
- Avoid abbreviations unless universally understood
- Use descriptive names: `firstName` not `fName`

### References
- Use `Types.ObjectId` for references
- Always specify `ref` property for population

---

## DTOs (Data Transfer Objects)

### Validation
- Use `class-validator` decorators
- Always validate incoming data

```typescript
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;
}
```

### Transformation
- Use `class-transformer` for type conversion
- Apply `@Transform()` decorator when needed

---

## Controllers

### Structure
```typescript
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
```

### Best Practices
- Keep controllers thin (delegate business logic to services)
- Use proper HTTP status codes
- Document with Swagger decorators (`@ApiOperation`, `@ApiResponse`)
- Use DTOs for request/response validation
- Handle route parameters with `@Param()`, query with `@Query()`, body with `@Body()`

---

## Services

### Structure
```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    this.eventEmitter.emit('user.created', user);
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
```

### Best Practices
- Contain all business logic
- Use repositories for database operations
- Throw appropriate exceptions (`NotFoundException`, `BadRequestException`)
- Use dependency injection
- Keep methods focused and testable

---

## Repositories

### Pattern
```typescript
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
```

---

## Error Handling

### HTTP Exceptions
```typescript
import { 
  NotFoundException, 
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException
} from '@nestjs/common';

// Use built-in exceptions
throw new NotFoundException('Resource not found');
throw new BadRequestException('Invalid input data');
throw new UnauthorizedException('Invalid credentials');
```

### Custom Exceptions
```typescript
export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}
```

### Global Exception Filter
- Implement centralized error handling
- Log errors appropriately
- Return consistent error responses

---

## Microservices Communication

### Event Patterns
```typescript
// Event naming: <service>.<entity>.<action>
'order.created'
'user.updated'
'payment.processed'
```

### Message Patterns
```typescript
// Pattern naming: <service>.<action>
{ cmd: 'user.find' }
{ cmd: 'order.create' }
```

### Best Practices
- Use event-driven architecture for asynchronous operations
- Use message patterns for synchronous requests
- Implement retry logic with exponential backoff
- Use circuit breakers for external service calls

---

## Environment Variables

### Naming
- **UPPER_SNAKE_CASE**
- Prefix with service name: `USER_SERVICE_PORT`, `ORDER_SERVICE_DB_URI`

### Configuration
```typescript
// config/database.config.ts
export default () => ({
  database: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME,
  },
  port: parseInt(process.env.PORT, 10) || 3000,
});
```

---

## Testing

### File Naming
- Unit tests: `user.service.spec.ts`
- E2E tests: `user.e2e-spec.ts`

### Structure
```typescript
describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const createUserDto = { email: 'test@test.com', password: 'password' };
      
      // Act
      const result = await service.create(createUserDto);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
    });
  });
});
```

---

## Git Conventions

### Branch Naming
- `feature/user-authentication`
- `bugfix/fix-order-calculation`
- `hotfix/security-patch`
- `refactor/improve-user-service`

### Commit Messages
Follow conventional commits:
```
feat: add user authentication
fix: resolve order total calculation bug
docs: update API documentation
refactor: simplify payment service logic
test: add unit tests for user service
chore: update dependencies
```

### PR Guidelines
- Include description of changes
- Reference related issues
- Ensure all tests pass
- Request review from at least one team member

---

## Documentation

### Code Comments
- Use JSDoc for public APIs
- Explain **why**, not **what**
- Keep comments up-to-date

### Swagger/OpenAPI
- Document all endpoints
- Include request/response examples
- Specify error responses

```typescript
@ApiOperation({ summary: 'Create a new user' })
@ApiResponse({ 
  status: 201, 
  description: 'User created successfully',
  type: User 
})
@ApiResponse({ 
  status: 400, 
  description: 'Invalid input data' 
})
```

---

## Performance Best Practices

- Use **indexes** on frequently queried fields
- Implement **pagination** for list endpoints
- Use **projections** to limit returned fields
- Implement **caching** where appropriate (Redis)
- Use **aggregation pipelines** for complex queries
- Avoid N+1 queries with proper population

---

## Security Best Practices

- **Never** commit sensitive data (use `.env` files)
- Validate and sanitize all inputs
- Use **helmet** for HTTP headers security
- Implement **rate limiting**
- Use **JWT** for authentication with short expiration
- Hash passwords with **bcrypt**
- Implement **CORS** properly
- Use **HTTPS** in production

---

## Code Review Checklist

- [ ] Code follows naming conventions
- [ ] Proper error handling implemented
- [ ] DTOs have validation decorators
- [ ] Tests are included and passing
- [ ] No sensitive data in code
- [ ] Documentation is updated
- [ ] No console.logs in production code
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Performance considerations addressed
- [ ] Security best practices followed