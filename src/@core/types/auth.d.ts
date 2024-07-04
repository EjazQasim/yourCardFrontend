import User from './user'

interface Token {
  token: string
}

export interface Tokens {
  access: Token
  refresh: Token
}

export interface Auth {
  user: User
  tokens: Tokens
}
