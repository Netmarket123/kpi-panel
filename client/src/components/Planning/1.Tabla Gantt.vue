<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Datos Planning</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Buscar por TASK NAME ..." single-line hide-details></v-text-field>
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
                <td>{{ props.item.level }}</td>
                <td>{{ props.item.owner }}</td>
                <td>{{ props.item.task }}</td>
                <td>{{ props.item.actualStart }}</td>
                <td>{{ props.item.actualEnd }}</td>
                <td>{{ props.item.progressValue }}</td>
                <td>{{ props.item.baselinestart }}</td>
                <td>{{ props.item.baselinefinish }}</td>
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
                    { text: 'Level', value: 'level', sortable: true},
                    { text: 'Owner', value: 'owner', sortable: true},
                    { text: 'Task', value: 'task', sortable: true},
                    { text: 'Start Time', value: 'actualStart',sortable: true},
                    { text: 'Finish Time', value: 'actualEnd', sortable: true},
                    { text: 'Complete (%)', value: 'progressValue', sortable: true},
                    { text: 'Baseline Start', value: 'baselinestart',sortable: true},
                    { text: 'Baseline Finish', value: 'baselinefinish', sortable: true},
                ],
            }
        },
        created () {
            this.listar()
        },
        methods: {
            listar() {
                const path = "http://localhost:5000/getanygantt_table";
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
