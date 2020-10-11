<template>
  <v-container grid-list-m>
    <v-layout wrap>
      <v-flex xs12 sm12 md6 lg6>
        <h3 style="color: #10133e;font-weight: bold;"> Numero de incidencias por equipo </h3>
            <v-flex xs12 sm12 md12>
                <div id="issue_container" style = "height:320px;"></div>
            </v-flex>
            <h3 style="color: #10133e;font-weight: bold;"> Desviacion respecto objetivo por equipo </h3>
            <v-flex xs12 sm12 md12>
                <div id="r_container" style = "height:320px;"></div>
            </v-flex>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6>
          <h3 style="color: #10133e;font-weight: bold;"> Desviacion respecto objetivo por equipo </h3>
          <div id="pie_container" style = "height:500px;"></div>
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
      axios.get('http://localhost:5000/kpi_panel').then(function (response){
          //console.log(response);
          me.valores=response.data.data;
          me.graficar();
      }).catch(function(error){
          console.log(error);
      });
    },
    graficar(){
        var issue_data = this.valores.issue_list
        var r_r_target = this.valores.r_r_list
        var pie_rr_target = this.valores.r_r_target_list
        //console.log(issue_data)
        anychart.onDocumentReady(function () {
      // create data set on our data
      var dataSet = anychart.data.set(issue_data);
      // map data for the first series, take x from the zero column and value from the first column of data set
      var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

      // map data for the second series, take x from the zero column and value from the second column of data set
      var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

      // map data for the second series, take x from the zero column and value from the third column of data set
      var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });

      // map data for the fourth series, take x from the zero column and value from the fourth column of data set
    //   var fourthSeriesData = dataSet.mapAs({ x: 0, value: 4 });

      // create bar chart
      var chart = anychart.column3d();

      // force chart to stack values by Y scale.
      chart.yScale().stackMode('value');

      // turn on chart animation
      chart.animation(true);

      // set chart title text settings
      chart.title('Count of Issues');

      // set yAxis labels formatting, force it to add % to values
      chart.yAxis(0).labels().format('{%Value}');

      // helper function to setup label settings for all series
      var setupSeries = function (series, name) {
        series.name(name).stroke('2 #fff 1');
        series.hovered().stroke('2 #fff 1');
      };

      // temp variable to store series instance
      var series;

      // create first series with mapped data
      series = chart.column(firstSeriesData);
      setupSeries(series, 'CLOSE');

      // create second series with mapped data
      series = chart.column(secondSeriesData);
      setupSeries(series, 'IN PROGRESS');

      // create third series with mapped data
      series = chart.column(thirdSeriesData);
      setupSeries(series, 'STARTING');

      chart.interactivity().hoverMode('by-x');
      chart.tooltip().displayMode('union');

      // turn on legend
      chart.legend().enabled(true).fontSize(13).padding([0, 0, 25, 0]);
      var credits = chart.credits();
      credits.enabled(false);
      // set container id for the chart
      chart.container('issue_container');
      // initiate chart drawing
      chart.draw();
    });

    anychart.onDocumentReady(function () {
      var dataSet = anychart.data.set(r_r_target);
      var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
      var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });
      var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });

      var chart = anychart.column3d();
      chart.yScale().stackMode('value');
      chart.animation(true);
      chart.title('Sum of R.R- target');
      chart.yAxis(0).labels().format('{%Value}');
      var setupSeries = function (series, name) {
        series.name(name).stroke('2 #fff 1');
        series.hovered().stroke('2 #fff 1');
      };
      var series;
      series = chart.column(firstSeriesData);
      setupSeries(series, 'CLOSE');
      series = chart.column(secondSeriesData);
      setupSeries(series, 'IN PROGRESS');
      series = chart.column(thirdSeriesData);
      setupSeries(series, 'STARTING');
      chart.interactivity().hoverMode('by-x');
      chart.tooltip().displayMode('union');
      chart.legend().enabled(true).fontSize(13).padding([0, 0, 25, 0]);
      chart.container('r_container');
      chart.draw();
    });

    anychart.onDocumentReady(function () {
      // create pie chart with passed data
      //console.log("This is pie",pie_rr_target);
      // var data = anychart.data.set(pie_rr_target);
      // console.log(data);
      // var wealth = data.mapAs({ x: 0, value: 2});

      var chart = anychart.pie(pie_rr_target);
      chart
        .labels()
        .hAlign('center')
        .position('inside')
        .format('value: {%abs}');

      // set chart title text settings
      chart.title('Sum of R.R - Target');

      // set legend title text settings
      chart
        .legend()
        // set legend position and items layout
        .position('center-bottom')
        .itemsLayout('horizontal')
        .align('center');

      // set container id for the chart
      chart.container('pie_container');
      // initiate chart drawing
      chart.draw();
    });
    }},
  mounted(){
    this.listar();
  }
}
</script>