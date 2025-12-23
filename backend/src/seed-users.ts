import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';

async function seedUsers() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'ecommerce.db',
    entities: [User],
    synchronize: false,
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  // Check if admin already exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@techhub.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = userRepository.create({
      email: 'admin@techhub.com',
      password: hashedPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    await userRepository.save(admin);
    console.log('✅ Admin user created:');
    console.log('   Email: admin@techhub.com');
    console.log('   Password: admin123');
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // Check if test user already exists
  const existingUser = await userRepository.findOne({
    where: { email: 'user@techhub.com' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('user123', 10);
    
    const user = userRepository.create({
      email: 'user@techhub.com',
      password: hashedPassword,
      name: 'Test User',
      role: UserRole.USER,
    });

    await userRepository.save(user);
    console.log('✅ Test user created:');
    console.log('   Email: user@techhub.com');
    console.log('   Password: user123');
  } else {
    console.log('ℹ️  Test user already exists');
  }

  await dataSource.destroy();
  console.log('\n🎉 User seeding completed!');
}

seedUsers().catch((error) => {
  console.error('Error seeding users:', error);
  process.exit(1);
});
