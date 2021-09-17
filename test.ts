interface Data {
    ok: Boolean,
    collection: {
      hasItems: Boolean,
      items: [
          {
            id: 1,
            name: 'asda'
          },
          {
            id: 1,
            name: 'asda'
          }
      ],
      page: Number,
      pages: Number,
      take: Number,
      total: Number
    }
  }

  interface Cocina {
      nombreCliente: string,
      idEmpleado: number;
      numeroDeMesa: number;
      done: boolean
      items: ['orders']
  }

  interface Mesero {

  }