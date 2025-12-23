"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
async function seedUsers() {
    const dataSource = new typeorm_1.DataSource({
        type: 'sqlite',
        database: 'ecommerce.db',
        entities: [user_entity_1.User],
        synchronize: false,
    });
    await dataSource.initialize();
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const existingAdmin = await userRepository.findOne({
        where: { email: 'admin@techhub.com' },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = userRepository.create({
            email: 'admin@techhub.com',
            password: hashedPassword,
            name: 'Admin User',
            role: user_entity_1.UserRole.ADMIN,
        });
        await userRepository.save(admin);
        console.log('✅ Admin user created:');
        console.log('   Email: admin@techhub.com');
        console.log('   Password: admin123');
    }
    else {
        console.log('ℹ️  Admin user already exists');
    }
    const existingUser = await userRepository.findOne({
        where: { email: 'user@techhub.com' },
    });
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash('user123', 10);
        const user = userRepository.create({
            email: 'user@techhub.com',
            password: hashedPassword,
            name: 'Test User',
            role: user_entity_1.UserRole.USER,
        });
        await userRepository.save(user);
        console.log('✅ Test user created:');
        console.log('   Email: user@techhub.com');
        console.log('   Password: user123');
    }
    else {
        console.log('ℹ️  Test user already exists');
    }
    await dataSource.destroy();
    console.log('\n🎉 User seeding completed!');
}
seedUsers().catch((error) => {
    console.error('Error seeding users:', error);
    process.exit(1);
});
//# sourceMappingURL=seed-users.js.map