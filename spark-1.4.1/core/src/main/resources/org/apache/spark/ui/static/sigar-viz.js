function drawSigarMetrics(sigarMetrics) {

    var newtworkData = [];
    var networkMap = {};

    var diskData = [];
    var diskMap = {};

    var cpuData = [];
    var cpuMap = {};

    var ramData = [];
    var ramMap = {};

    var legend = [];

    for (var x in sigarMetrics) {
        var host = sigarMetrics[x].host;

        var existingNetworkData = [];
        if (host in networkMap) {
            existingNetworkData = networkMap[host];
        }
        existingNetworkData.push({
            date: new Date(sigarMetrics[x].timestamp),
            value: parseFloat(sigarMetrics[x].kBytesRxPerSecond) + parseFloat(sigarMetrics[x].kBytesTxPerSecond)
        });
        networkMap[host] = existingNetworkData;

        var existingDiskData = [];
        if (host in diskMap) {
            existingDiskData = diskMap[host];
        }
        existingDiskData.push({
            date: new Date(sigarMetrics[x].timestamp),
            value: parseFloat(sigarMetrics[x].kBytesWrittenPerSecond) + parseFloat(sigarMetrics[x].kBytesReadPerSecond)
        })
        diskMap[host] = existingDiskData;

        var existingCpuData = [];
        if (host in cpuMap) {
            existingCpuData = cpuMap[host];
        }
        existingCpuData.push({
            date: new Date(sigarMetrics[x].timestamp),
            value: parseFloat(sigarMetrics[x].cpu)
        })
        cpuMap[host] = existingCpuData;

        var existingRamData = [];
        if (host in ramMap) {
            existingRamData = ramMap[host];
        }
        existingRamData.push({
            date: new Date(sigarMetrics[x].timestamp),
            value: parseFloat(sigarMetrics[x].ram)
        })
        ramMap[host] = existingRamData;
    }
    for (var host in networkMap) {
        legend.push(host);
        newtworkData.push(networkMap[host]);
        diskData.push(diskMap[host]);
        cpuData.push(cpuMap[host]);
        ramData.push(ramMap[host]);
    }

    var networkGraph = {
        title: "Total Network Traffic",
        description: "Sum of kBytesRxPerSecond and kBytesTxPerSecond per host",
        data: newtworkData,
        area: false,
        right: 100,
        width: 300,
        missing_is_zero: false,
        interpolate: 'basic',
        min_y: -1,
        y_extended_ticks: true,
        height: 300,
        legend: legend,
        target: '#sigar-network-metrics'
    }

    MG.data_graphic(networkGraph);
    addEventListener("network",networkGraph);

    var diskGraph = {
        title: "Total Disk IO",
        description: "Sum of kBytes Written and Read per host",
        data: diskData,
        area: false,
        right: 100,
        width: 300,
        missing_is_zero: false,
        interpolate: 'basic',
        min_y: -1,
        y_extended_ticks: true,
        height: 300,
        legend: legend,
        target: '#sigar-disk-metrics'
    }

    MG.data_graphic(diskGraph);
    addEventListener("disk",diskGraph);

    var cpuGraph = {
        title: "CPU Utilization",
        description: "Percentage of CPU Utilization per host",
        data: cpuData,
        area: false,
        right: 100,
        width: 300,
        missing_is_zero: false,
        interpolate: 'basic',
        min_y: -1,
        y_extended_ticks: true,
        height: 300,
        legend: legend,
        target: '#sigar-cpu-metrics'
    }

    MG.data_graphic(cpuGraph);
    addEventListener("cpu",cpuGraph);

    var ramGraph = {
        title: "RAM Utilization",
        description: "Percentage of RAM Utilization per host",
        data: ramData,
        area: false,
        right: 100,
        width: 300,
        missing_is_zero: false,
        interpolate: 'basic',
        min_y: -1,
        y_extended_ticks: true,
        height: 300,
        legend: legend,
        target: '#sigar-ram-metrics'
    }

    MG.data_graphic(ramGraph);
    addEventListener("ram",ramGraph);

}

function addEventListener(tag, graph) {
    $("span.expand-"+tag).click(function () {
        var status = ($("#sigar-"+tag+"-metrics").css('display'));
        $("#sigar-"+tag+"-metrics").toggleClass('collapsed');
        if (status == 'none') {
            graph.full_width = true;
            MG.data_graphic(graph);
        }
        // Switch the class of the arrow from open to closed.
        $(this).find('.expand-'+tag+'-arrow').toggleClass('arrow-open');
        $(this).find('.expand-'+tag+'-arrow').toggleClass('arrow-closed');
    });
}