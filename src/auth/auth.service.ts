import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { ROLE_ENUM } from 'src/enums/role.enum';
import { STARUS_ENUM } from 'src/enums/user_status.enums';
import { User } from 'src/modules/users/users.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, address?: string, role: ROLE_ENUM = ROLE_ENUM.USER,status: STARUS_ENUM = STARUS_ENUM.ON,profilePicture: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png') {
    // สร้างแฮชของรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Debug: แสดง hash รหัสผ่านที่สร้างขึ้นมา
  
    try {
      const user = await this.usersService.create({
        email,
        passwordHash: hashedPassword, // เก็บ hashed password
        firstName,
        lastName,
        phoneNumber,
        address,
        role,
        status,
        profilePicture
      });
      return this.generateToken(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException('เบอร์โทรหรืออีเมลถูกใช้แล้ว', HttpStatus.CONFLICT);
      }
      throw new HttpException('An error occurred during registration', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
  
    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (user && user.passwordHash) {
      console.log('User found:', user); // Debug: แสดงข้อมูลผู้ใช้
      console.log('Password provided:', password); // Debug: แสดงรหัสผ่านที่ใส่เข้ามา
      console.log('Password hash from DB:', user.passwordHash); // Debug: แสดง hash รหัสผ่านที่ดึงมาจากฐานข้อมูล
  
      const isMatch = await bcrypt.compare(password, user.passwordHash);
  
      if (isMatch) {
        return user; // คืนค่าผู้ใช้หากรหัสผ่านถูกต้อง
      }
    } else {
      console.log('User not found or password hash is missing'); // Debug: แสดงกรณีที่ผู้ใช้ไม่ถูกพบหรือไม่มี password hash
    }
  
    return null; // คืนค่า null หากผู้ใช้ไม่ถูกต้องหรือรหัสผ่านไม่ตรงกัน
  }
  

  async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    console.log('login', user); // Check if user is logged correctly
  
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  
    const token = await this.generateToken(user); // Assuming generateToken returns access_token
    return { ...token, id: user.id };  // Make sure id is returned
  }
  
}
