<script lang="ts">
    import "chart.js/auto";
    import { Pie } from "svelte-chartjs";

   

    export let labels = [];
    export let counts = [];
   
    let data = {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: [
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C",
                    "#949FB1",
                    "#4D5360",
                    "#AC64AD",
                ],
                hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870",
                    "#A8B3C5",
                    "#616774",
                    "#DA92DB",
                ],
            },
        ],
    };
</script>

<div class="chart-container lg:w-full shadow-md round">
    <Pie {data} options={{ maintainAspectRatio: false, responsive: true}} />
</div>
