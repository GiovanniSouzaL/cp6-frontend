import { createContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { API_URL } from "../api";

type AuthContextType = {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signin: (email: string, password: string) => Promise<string | void>;
  signup: (nome: string, email: string, password: string) => Promise<string | void>;
  signout: () => void;
  toggleDesejo: (jogoId: string) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromAPI = async () => {
      const userToken = localStorage.getItem("user_token");

      if (userToken) {
        try {
          const tokenData = JSON.parse(userToken);
          const response = await fetch(`${API_URL}/user?email=${tokenData.email}`);
          const users = await response.json();

          if (users.length > 0) {
            setUser(users[0]);
          }
        } catch (error) {
          console.error("Erro ao buscar usuário na API", error);
        }
      }
      setLoading(false);
    };

    loadUserFromAPI();
  }, []);

  const signup = useCallback(
    async (nome: string, email: string, password: string): Promise<string | void> => {
      try {
        const response = await fetch(`${API_URL}/user?email=${email}`);
        const users = await response.json();

        if (users.length > 0) {
          return "Já existe uma conta com este e-mail";
        }

        await fetch(`${API_URL}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha: password, desejos: [] }),
        });
      } catch (error) {
        console.log(error);
        return "Erro de conexão com o servidor";
      }
    },
    []
  );

  const signin = useCallback(
    async (email: string, password: string): Promise<string | void> => {
      try {
        const response = await fetch(`${API_URL}/user?email=${email}`);
        const users = await response.json();

        if (users.length > 0) {
          const hasUser: User = users[0];

          if (hasUser.senha?.toString() === password.toString()) {
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem("user_token", JSON.stringify({ email, token }));

            setUser(hasUser);
            return;
          } else {
            return "E-mail ou senha incorretos";
          }
        } else {
          return "Usuário não cadastrado";
        }
      } catch (error) {
        console.log(error);
        return "Erro de conexão com o servidor";
      }
    },
    []
  );

  const signout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user_token");
  }, []);

  const toggleDesejo = useCallback(
    async (jogoId: string): Promise<void> => {
      if (!user || !user.id) return;

      const atuais = user.desejos ?? [];
      const novos = atuais.includes(jogoId)
        ? atuais.filter((id) => id !== jogoId)
        : [...atuais, jogoId];

      try {
        const response = await fetch(`${API_URL}/user/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ desejos: novos }),
        });
        const atualizado: User = await response.json();
        setUser(atualizado);
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, loading, signin, signup, signout, toggleDesejo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
