<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Base de Datos para los KPIs</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Buscar por ISSUE NAME..." single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="resultado"
                :search="search"
                class="elevation-1"
                hide-actions
            >
                <template v-slot:items="props">
                <td class="text-xs-left">
                    <v-icon
                    small
                    class="mr-2"
                    >
                    edit
                    </v-icon>
                    <template v-if="props.item.estado">
                        <v-icon
                        small
                        >
                        block
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon
                        small
                        >
                        check
                        </v-icon>
                    </template>
                </td>
                <td>{{ props.item.issue }}</td>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.team }}</td>
                <td>{{ props.item.priority }}</td>
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.first_meeting }}</td>
                <td>{{ props.item.decision }}</td>
                <td>{{ props.item.result }}</td>
                <td>{{ props.item.result_target }}</td>
                <td>{{ props.item.r_r_target }}</td>

                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="listar()">Reset</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                dialog: false,
                search:'',
                resultado:[],
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false},
                    { text: 'Issue', value: 'issue', sortable: true},
                    { text: 'Code', value: 'code', sortable: true},
                    { text: 'Team', value: 'team', sortable: true},
                    { text: 'Priority', value: 'priority',sortable: true},
                    { text: 'Status', value: 'status', sortable: true},
                    { text: '1rst Meeting', value: 'first_meeting', sortable: true},
                    { text: 'Decision', value: 'decision',sortable: true},
                    { text: 'Result', value: 'result', sortable: true},
                    { text: 'Result Target', value: 'result_target', sortable: true},
                    { text: 'R.R.Target', value: 'r_r_target', sortable: true},
                ],
            }
        },
        created () {
            this.listar()
        },
        methods: {
            listar() {
                const path = "http://localhost:5000/kpi_data";
                axios
                    .get(path)
                    .then((response) => {
                    //console.log("this",response.data);
                    this.resultado = response.data.data;
                    //console.log(this.resultado)
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            }          
        }
    }
</script>
