<template>
  <v-container grid-list-m>
    <h3 style="color: #10133e;font-weight: bold;padding-bottom:80px;padding-left:-20px"> Gantt Project Management </h3>
    <v-layout wrap>
      <v-flex >
        <div id="container" style="width:100%;height:700px"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
// import anychart from 'anychart';

export default {
  data(){
    return {
      valores:[],
      light_list:[],
      tempo_list:[],
      label_list:[]
    }
  },
  methods:{
    listar (){
      let me=this;
      axios.get('http://localhost:5000/getanygantt').then(function (response){
          //console.log(response);
          me.valores=response.data.data;
          console.log(me.valores);
          me.graficar();
      }).catch(function(error){
          console.log(error);
      });
    },
    graficar(){
        var datos = this.valores;
      for (var i = 0; i < datos.length; i++) {
        datos[i]['start'] = new Date(datos[i]['start']).getTime();
        datos[i]['end'] = new Date(datos[i]['end']).getTime();
      }
        var today = new Date(),
        day = 1000 * 60 * 60 * 24,
        // Utility functions
        dateFormat = Highcharts.dateFormat,
        defined = Highcharts.defined,
        isObject = Highcharts.isObject,
        reduce = Highcharts.reduce;
        console.log(today);

      // Set to 00:00:00:000 today
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);
        today = today.getTime();
        console.log(today);
        Highcharts.ganttChart('container', {
          series: [{
            name: 'Project',
            data: datos
          }],
          rangeSelector: {
    enabled: true,
  },
          chart: {
            spacingLeft: 10
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                  cursor: 'default',
                  pointerEvents: 'none'
                }
              }
            }
          },
          tooltip: {
            pointFormatter: function () {
              var point = this,
                format = '%d/%m/%Y',
                options = point.options,
                completed = options.completed,
                amount = isObject(completed) ? completed.amount : completed,
                status = ((amount || 0) * 100) + '%',
                lines;

              lines = [{
                value: point.name,
                style: 'font-weight: bold;'
              }, {
                title: 'Start Date: ',
                value: dateFormat(format, point.start)
              }, {
                visible: !options.milestone,
                title: 'Finish Date: ',
                value: dateFormat(format, point.end)
              }, {
                title: 'Percent: ',
                value: status
              }, {
                title: 'Owner',
                value: options.owner || 'unassigned'
              }];

              return reduce(lines, function (str, line) {
                var s = '',
                  style = (
                    defined(line.style) ? line.style : 'font-size: 0.8em;'
                  );
                if (line.visible !== false) {
                  s = (
                    '<span style="' + style + '">' +
                    (defined(line.title) ? line.title + ': ' : '') +
                    (defined(line.value) ? line.value : '') +
                    '</span><br/>'
                  );
                }
                return str + s;
              }, '');
            }
          },
           credits: {
    enabled: false
  },
  
          // title: {
          //   text: 'Gantt Project Management',
          //   align: 'left',
          //   style:{"color": "#10133e","font-weight": "bold","font-size":"22px"}
          // },
          // navigator: {
          //   enabled: true,
          //   liveRedraw: true,
          //   series: {
          //     type: 'gantt',
          //     pointPlacement: 0.5,
          //     pointPadding: 0.25
          //   },
          //   yAxis: {
          //     min: 0,
          //     max: 3,
          //     reversed: true,
          //     categories: []
          //   }
          // },
          scrollbar: {
            enabled: true
          },
          yAxis: {
            type: 'category',
            grid: {
              enabled: true,
              borderColor: 'rgba(0,0,0,0.3)',
              borderWidth: 1,
              columns: [{
                title: {
                  text: 'Owner'
                },
                labels: {
                  format: '{point.owner}',
                  useHTML: true,
                  style:{
                    width: '70px',
                    height: '18px'
                  }
                }
              },{
                title: {
                  text: 'Task'
                },
                labels: {
                  format: '{point.name}',
                  useHTML: true,
                  style:{
                    width: '200px',
                    height: '18px'
                  }
                }
              }, {
                labels: {
                  format: '{point.start:%d/%m/%Y}'
                },
                title: {
                  text: 'Start date'
                }
              },{
                title: {
                  text: 'Finish date'
                },
                labels: {
                  format: '{point.end:%d/%m/%Y}'
                }
              },{
                title: {
                  text: 'Duration'
                },
                labels: {
                  format: '{point.duration}'
                }
              }]
            }
          },
          xAxis: [{
            labels: {
            format: '{value:%w}' // day of the week
              },
              grid: { // default setting
                enabled: true 
              },
              tickInterval: 1000 * 60 * 60 * 24, // Day
            }, {
              labels: {
                format: '{value:%W}'
              },
              tickInterval: 1000 * 60 * 60 * 24 * 7 // week
            }],
        });

    }},
  mounted(){
    this.listar();
  }
}
</script>