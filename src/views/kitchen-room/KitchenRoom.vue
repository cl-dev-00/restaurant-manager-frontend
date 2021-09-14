<template>
    <div class="orders">
        <v-container fluid class="black">

            <v-row>
                <!-- Columnas de Cards, responsivo -->
                <v-col  v-for="order in orders" :key="order.name" 
                xs="12" sm="6" md="4" lg="3" xl="2"
                class="mb-0">
                    <!-- Configuracion de Card -->
                    <v-card class="mb-0"
                    min-height="400"
                    max-height="400">
                        <!-- Header de las Card -->
                        <v-list-item three-line class="pink">
                        <v-list-item-content class="white--text">
                            <v-list-item-title class="text-h5">{{order.name}}</v-list-item-title>
                            <v-list-item-subtitle class="white--text">{{order.product}}</v-list-item-subtitle>
                            <v-list-item-subtitle class="white--text">Nombre del mesero</v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>
                        <!-- Listado de items de la orden -->
                        <v-responsive
                            class="overflow-y-auto"
                            max-height="250"
                        >
                            <v-list two-line height="">
                                <v-list-item-group
                                    v-model="selected"
                                    active-class="green--text"
                                    multiple
                                >
                                    <template v-for="(item) in items">
                                        <v-list-item :key="item.order">

                                            <template v-slot:default="{ active }">

                                                <v-list-item-action>
                                                    <v-list-item-title v-text="item.amount"></v-list-item-title>
                                                </v-list-item-action>

                                                <v-list-item-content>
                                                    <v-list-item-title v-text="item.order"></v-list-item-title>
                                                    <v-list-item-subtitle class="text--primary" v-text="item.notes"></v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-action>
                                                    <v-icon v-if="!active" color="grey lighten-1" small>
                                                    mdi-thumb-up
                                                    </v-icon>
                                                    <v-icon v-else color="green darken-3">
                                                    mdi-thumb-up
                                                    </v-icon>
                                                </v-list-item-action>

                                            </template>
                                        </v-list-item>

                                    </template>
                                </v-list-item-group>
                            </v-list>
                        </v-responsive>
                        <!-- Boton para completads -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn>Check</v-btn>
                        </v-card-actions>

                    </v-card>

                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
export default{
    data(){
        return{
            orders:[
                { name:'Jose Adolfo', product:'Salchipapa' },
                { name:'Martin Fierro', product:'Papitas' },
                { name:'Dario Barassi', product:'Milanessa' },
                { name:'Jose Adolfo', product:'Salchipapa' },
                { name:'Martin Fierro', product:'Papitas' },
                { name:'Dario Barassi', product:'Milanessa' }
            ],
         
            items: [
                {
                amount: '1',
                notes: 'No tomate',         
                order: 'Hamburguesa de Res',
                },
                {
                amount: '2',
                notes: 'Con pepinillos',
                order: 'Sub de Pavo',
                },
                {
                amount: '6',
                notes: '',
                order: 'Cafe Americano',
                },
                {
                amount: '6',
                notes: '',
                order: 'Cafe Americano',
                },
                
            ],
        }
    }
}
</script>
