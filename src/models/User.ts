import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column({ name: "first_name" })
    firstName!: string;

    @Column({ name: "last_name" })
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    birthdate!: Date;

    @Column({ name: "phone_number" })
    phoneNumber!: string;

    @Column()
    cpf!: string;

    @Column({ name: "zip_code" })
    zipCode!: string;

    @Column()
    avatar!: string;

    @Column({ name: "is_admin" })
    isAdmin!: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
