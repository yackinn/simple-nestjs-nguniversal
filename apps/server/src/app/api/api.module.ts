import { Module }        from '@nestjs/common';
import { AuthModule }    from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule }    from './user/user.module';

@Module({
  imports: [ProductModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
