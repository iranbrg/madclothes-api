import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn("uuid")
    public readonly id!: string;

    @Column({ name: "first_name" })
    public firstName!: string;

    @Column({ name: "last_name" })
    public lastName!: string;

    @Column()
    public email!: string;

    @Column()
    public password!: string;

    @Column()
    public birthdate!: Date;

    @Column({ name: "phone_number" })
    public phoneNumber!: string;

    @Column()
    public cpf!: string;

    @Column({ name: "zip_code" })
    public zipCode!: string;

    @Column()
    public avatar!: string;

    @Column({ name: "is_admin" })
    public isAdmin!: boolean;

    @CreateDateColumn({ name: "created_at" })
    public createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    public updatedAt!: Date;
}
