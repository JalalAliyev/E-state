import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInput {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: string;
  updatedAt: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next: any) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const roundSalt = Number(process.env.saltWorkFactor) || 10;
  const salt = await bcrypt.genSalt(roundSalt);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  const result = await bcrypt
    .compare(candidatePassword, user.password)
    .then(() => true)
    .catch(() => false);
  return result;
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
