import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上である必要があります")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "パスワードは少なくとも1つの大文字、小文字、数字、特殊文字を含む必要があります"
    ),
});

export const signupSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(2, "名前は2文字以上である必要があります")
      .max(50, "名前は50文字以下である必要があります"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });
