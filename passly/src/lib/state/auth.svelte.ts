import { browser } from "$app/env";

export interface User {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  role: string;
  created_at: string;
}

class AuthState {
  user = $state<User | null>(null);
  token = $state<string | null>(null);

  constructor() {
    if (browser) {
      const stored_user = localStorage.getItem("passly_user");
      const stored_token = localStorage.getItem("passly_token");
      if (stored_user) {
        try {
          this.user = JSON.parse(stored_user);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          this.user = null;
        }
      }
      if (stored_token) this.token = stored_token;
    }
  }

  set_user(new_user: User) {
    this.user = new_user;
    if (browser) localStorage.setItem("passly_user", JSON.stringify(new_user));
  }

  set_token(new_token: string) {
    this.token = new_token;
    if (browser) localStorage.setItem("passly_token", new_token);
  }

  logout() {
    this.user = null;
    this.token = null;
    if (browser) {
      localStorage.removeItem("passly_user");
      localStorage.removeItem("passly_token");
    }
  }

  get is_authenticated() { return this.user !== null && this.token !== null; }

  get auth_headers(): Record<string, string> {
    if (this.token) return { Authorization: `Bearer ${this.token}` };
    return {};
  }
}

export const auth = new AuthState();

// TODO: proteger en el backend todos los endpoints privados; actualmente solo algunos aplican los guards de JWT y rol.