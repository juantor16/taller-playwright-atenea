import { APIRequestContext, expect } from '@playwright/test';

export class BackendUtils {

  static async crearUsuarioPorAPI(request: APIRequestContext, usuario: any, esNuevo: boolean = true) {
    let email: string;

    if (esNuevo) {
      email = (usuario.email.split('@')[0]) + Date.now().toString() + '@' + usuario.email.split('@')[1];
    } else {
      email = usuario.email;
    }

    const response = await request.post('http://localhost:6007/api/auth/signup', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      data: {
        firstName: usuario.nombre,
        lastName: usuario.apellido,
        email: email,
        password: usuario.contraseña,
      }
    });
    expect(response.status()).toBe(201);
    return { email: email, contraseña: usuario.contraseña };
  }
}