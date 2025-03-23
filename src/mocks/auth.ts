import { User, AuthResponse } from "../types/auth";

interface MockUser extends User {
  password: string;
}

const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "test@example.com",
    name: "テストユーザー",
    password: "Password123!", // 本番環境では絶対に平文で保存しない
  },
];

export const mockAuth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return {
          status: "error",
          statusCode: 401,
          message: "メールアドレスまたはパスワードが正しくありません",
        };
      }

      const userWithoutPassword: User = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return {
        status: "success",
        statusCode: 200,
        data: {
          token: `mock-jwt-token-${user.id}`,
          user: userWithoutPassword,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        statusCode: 500,
        message: "予期せぬエラーが発生しました",
      };
    }
  },

  signup: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    try {
      if (mockUsers.some((u) => u.email === email)) {
        return {
          status: "error",
          statusCode: 409,
          message: "このメールアドレスは既に登録されています",
        };
      }

      const newUser: MockUser = {
        id: String(mockUsers.length + 1),
        email,
        name,
        password,
      };
      mockUsers.push(newUser);

      const userWithoutPassword: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      return {
        status: "success",
        statusCode: 201,
        data: {
          token: `mock-jwt-token-${newUser.id}`,
          user: userWithoutPassword,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        statusCode: 500,
        message: "予期せぬエラーが発生しました",
      };
    }
  },
};
