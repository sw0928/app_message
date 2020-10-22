/*下单失败*/
var id = localStorage.getItem('Authorization');
var tracId = localStorage.getItem('tracId');
var template = localStorage.getItem('template');
//组件通信
var bus = new Vue();
//左侧菜单组件实例化
Vue.component("v-order-fail", {
	template: '#right-template',
	data: function() {
		return {
			countVisit: $api.countVisit,
			countVisitByHour: $api.countVisitByHour,
			countVisitByEquipment: $api.countVisitByEquipment,
			countVisitByCity: $api.countVisitByCity,
			countMobileByCity: $api.countMobileByCity,
			data1: {
				"endTime": getDay(0),
				"startTime": getDay(-7),
				"tracId": tracId
			},

			templateA: template,
			dates: [],
			time: getDay(-7),
			allData: [],
			// userData:UserName,
			mapShow: false //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		$this.accessStatistics($this.data1);
		$this.hourStatistics(getDay(-7));
		$this.deviceStatistics(getDay(-7),getDay(0));
		$this.deviceStatisticsB(getDay(-7),getDay(0));
		$this.deviceStatisticsC(getDay(-7),getDay(0));
		$this.regionStatistics($this.data1);
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能      
			//监听提交
			form.on("submit(demo3)", function(data) {
				$this.dates = data.field.startDate.split('~');
				if(new Date($this.dates[1]).getTime() - new Date($this.dates[0]).getTime() > 2592000000) {
					layer.msg('时间间隔不能超过30天！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				} else {
					$this.data1.startTime = $this.dates[0];
					$this.data1.endTime = $this.dates[1];
					$this.time = $this.dates[0];
					$this.accessStatistics($this.data1);
					$this.hourStatistics($this.data1.startTime);
					$this.deviceStatistics($this.data1.startTime, $this.data1.endTime);
					$this.deviceStatisticsB($this.data1.startTime, $this.data1.endTime);
					$this.deviceStatisticsC($this.data1.startTime, $this.data1.endTime);
					$this.regionStatistics($this.data1);
					$('.sw_echart .one').addClass('addClass2').siblings().removeClass('addClass2');
				}
				return false;
			});
		});
		$('.sw_echart h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2');
			var num = $(this).attr('data');
			if(num == '0') {
				$this.phoneStatistics($this.data1.startTime, $this.data1.endTime, num);
			} else if(num == '1') {
				$this.phoneStatistics($this.data1.startTime, $this.data1.endTime, num);
			} else {
				$this.regionStatistics($this.data1);
			}

		})
		//}, 100);
	},
	methods: {
		accessStatistics: function(data) {
			var $this = this;
			var myChart1 = echarts.init(document.getElementById('myChart1'));
			myChart1.clear();
			$.ajax({
				url: $this.countVisit,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						$this.allData = res.data;
						let time = [],
							chickNum = [],
							effectiveChickNum = [],
							unEffectiveChickNum = [],
							uvNum = [],
							ipNum = [];
						for(let i = 0; i < $this.allData.details.length; i++) {
							time.push($this.allData.details[i].time);
							chickNum.push($this.allData.details[i].chickNum);
							effectiveChickNum.push($this.allData.details[i].effectiveChickNum);
							unEffectiveChickNum.push($this.allData.details[i].unEffectiveChickNum);
							uvNum.push($this.allData.details[i].uvNum);
							ipNum.push($this.allData.details[i].ipNum);
						};
						var accessStatistics = {
							"tooltip": {
								"trigger": "axis",
								"axisPointer": {
									"type": "shadow",
									textStyle: {
										color: "#fff"
									}

								},
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '10%',
								containLabel: true
							},
							"legend": {
								x: '30%',
								top: '5%',
								textStyle: {
									color: '#90979c',
								},
								"data": ['有效跳转', '无效跳转', '总数', '独立用户(UV)', 'IP数']
							},

							//"calculable": true,
							"xAxis": [{
								"type": "category",
								"axisLine": {
									lineStyle: {
										color: '#90979c'
									}
								},
								"splitLine": {
									"show": false
								},
								"axisTick": {
									"show": false
								},
								"splitArea": {
									"show": false
								},
								"axisLabel": {
									"interval": 0,

								},
								"data": time,
							}],
							"yAxis": [{
								"type": "value",
								//					"splitLine": {
								//						"show": false
								//					},
								"axisLine": {
									lineStyle: {
										color: '#90979c'
									}
								},
								"axisTick": {
									"show": false
								},
								"axisLabel": {
									"interval": 0,

								},
								"splitArea": {
									"show": false
								},

							}],
							"series": [{
									"name": "有效跳转",
									"type": "bar",
									"stack": "总数",
									"barMaxWidth": 35,
									"barGap": "10%",
									"itemStyle": {
										"normal": {
											"color": "#09d69f",
											"label": {
												// "show": true,
												"textStyle": {
													"color": "#fff"
												},
												"position": "inside",
												formatter: function(p) {
													return p.value > 0 ? (p.value) : '';
												}
											}
										}
									},

									"data": effectiveChickNum,
								},

								{
									"name": "无效跳转",
									"type": "bar",
									"stack": "总数",
									"itemStyle": {
										"normal": {
											"color": "#ffd166",
											"barBorderRadius": 0,
											"label": {
												// "show": true,
												"position": "inside",
												formatter: function(p) {
													return p.value > 0 ? (p.value) : '';
												}
											}
										}
									},
									"data": unEffectiveChickNum
								}, {
									"name": "总数",
									"type": "line",
									//"stack": "总数",
									symbolSize: 5,
									symbol: 'circle',
									"itemStyle": {
										"normal": {
											"color": "#57b8dc",
											"barBorderRadius": 0,
											"label": {
												// "show": true,
												"position": "top",
												formatter: function(p) {
													return p.value > 0 ? (p.value) : '';
												}
											}
										}
									},
									"data": chickNum
								}, {
									"name": "独立用户(UV)",
									"type": "line",
									symbolSize: 5,
									symbol: 'circle',
									"itemStyle": {
										"normal": {
											"color": "#ef476f",
											"barBorderRadius": 0,
											"label": {
												//  "show": true,
												"position": "top",
												formatter: function(p) {
													return p.value > 0 ? (p.value) : '';
												}
											}
										}
									},
									markPoint: {
										data: [{
												type: 'max',
												name: '最大值'
											},
											{
												type: 'min',
												name: '最小值'
											}
										]
									},
									"data": uvNum
								}, {
									"name": "IP数",
									"type": "line",
									symbolSize: 5,
									symbol: 'circle',
									"itemStyle": {
										"normal": {
											"color": "rgba(22,230,48,1)",
											"barBorderRadius": 0,
											"label": {
												// "show": true,
												"position": "top",
												formatter: function(p) {
													return p.value > 0 ? (p.value) : '';
												}
											}
										}
									},
									"data": ipNum
								},
							]
						};
						myChart1.setOption(accessStatistics);

					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
			$(document).ready(function() {
				$(window).resize(function() {
					myChart1.resize();
					try {} catch(err) {
						return false;
					}
				});
			});
		},
		hourStatistics: function(startTime) {
			var $this = this;
			let hour = [];
			var myChart2 = echarts.init(document.getElementById('myChart2'));
			myChart2.clear();
			$.ajax({
				url: $this.countVisitByHour,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"startTime": startTime,
					"tracId": tracId,
				}),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						hour = res.data;
						let time = [],
							chickNum = [],
							effectiveChickNum = [],
							unEffectiveChickNum = [],
							uvNum = [],
							ipNum = [];
						for(let i = 0; i < hour.length; i++) {
							time.push(hour[i].time);
							chickNum.push(hour[i].chickNum);
							effectiveChickNum.push(hour[i].effectiveChickNum);
							unEffectiveChickNum.push(hour[i].unEffectiveChickNum);
							uvNum.push(hour[i].uvNum);
							ipNum.push(hour[i].ipNum);
						};
						var hourStatistics = {
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['有效跳转', '无效跳转', '总数', '独立用户(UV)', 'IP数']
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '10%',
								containLabel: true
							},
							xAxis: {
								type: 'category',
								boundaryGap: false,
								data: time
							},
							yAxis: {
								type: 'value'
							},
							series: [{
									name: '有效跳转',
									type: 'line',
								//	stack: '总数',
									smooth: true,
									data: effectiveChickNum
								},
								{
									name: '无效跳转',
									type: 'line',
								//	stack: '总数',
									smooth: true,
									data: unEffectiveChickNum
								},
								{
									name: '总数',
									type: 'line',
									//stack: '总数',
									smooth: true,
									data: chickNum
								},
								{
									name: '独立用户(UV)',
									type: 'line',
									//stack: '总量',
									smooth: true,
									data: uvNum
								},
								{
									name: 'IP数',
									type: 'line',
									//stack: '总量',
									smooth: true,
									data: ipNum
								}
							]
						};
						myChart2.setOption(hourStatistics);

					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
			$(document).ready(function() {
				$(window).resize(function() {
					myChart2.resize();
					try {} catch(err) {
						return false;
					}
				});

			});
		},
		deviceStatistics: function(startTime, endTime) {
			var $this = this;
			let device = [],
				deviceData = [],
				equipment = [];			
			var myChart3 = echarts.init(document.getElementById('myChart3'));
			myChart3.clear();
			$.ajax({
				url: $this.countVisitByEquipment,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"endTime": endTime,
					"startTime": startTime,
					"tracId": tracId,
					"queryEquipmentType": 0
				}),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						device = res.data
						for(let i = 0; i < device.length; i++) {
							equipment.push(device[i].equipment);
						};
						for(let i = 0; i < device.length; i++) {
							let arr = {
								name: '',
								value: '',
							};
							arr.name = device[i].equipment;
							arr.value = device[i].effectiveChickNum;
							deviceData.push(arr)
						};
						var deviceStatistics = {
										tooltip: {
											trigger: 'item',
											formatter: "{b} : <br/>{c} ({d}%)"
										},
										grid: {
											left: '3%',
											right: '4%',
											//bottom: '0%',
											containLabel: true
										},
										legend: [{
												data: equipment,
												x: '25%',
												y: '75%',
												orient: 'vertical',
												textStyle: {
													fontSize: 12
												},
											}
										],
										series: [{
											//name: '运营商占比',
											type: 'pie',
											radius: '60%',
											center: ['50%', '40%'],
											data: deviceData,
											label: {
												normal: {
													//formatter: '{b} : \n{c}',
													formatter: '{b} : \n{c}',
													position: 'outside',
												}
											},
											itemStyle: {
												emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
											}
										}],
										color: ['#9966ff', '#669900', '#3366ff']
									};
									myChart3.setOption(deviceStatistics);
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});

			$(document).ready(function() {
				
				$(window).resize(function() {
					myChart3.resize();
					try {} catch(err) {
						return false;
					}
				});
				//var height = $('#rightTable').get(0).scrollHeight;
				//$('#leftMenu_Box').css('height', height)
			});
		},
		deviceStatisticsB: function(startTime, endTime) {
			var $this = this;
			let 
				deviceB = [],				
				deviceDataB = [],
				equipmentB = [];
			var myChart5 = echarts.init(document.getElementById('myChart5'));
			myChart5.clear();
			$.ajax({
				url: $this.countVisitByEquipment,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"endTime": endTime,
					"startTime": startTime,
					"tracId": tracId,
					"queryEquipmentType": 2
				}),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						deviceB = res.data
						for(let i = 0; i < deviceB.length; i++) {
							equipmentB.push(deviceB[i].equipment);
						};
						for(let i = 0; i < deviceB.length; i++) {
							let arrB = {
								name: '',
								value: '',
							};
							arrB.name = deviceB[i].equipment;
							arrB.value = deviceB[i].effectiveChickNum;
							deviceDataB.push(arrB)
						};
						var deviceStatisticsB = {
							tooltip: {
								trigger: 'item',
								formatter: "{b} : <br/>{c} ({d}%)"
							},
							grid: {
								left: '3%',
								right: '4%',
								//bottom: '0%',
								containLabel: true
							},
							legend: [
								{
									data: equipmentB,
									x: '25%',
									y: '75%',
									orient: 'vertical',
									textStyle: {
										fontSize: 12
									},
								}
							],
							series: [{
								//name: '运营商占比',
								type: 'pie',
								radius: '60%',
								center: ['50%', '40%'],
								data: deviceDataB,
								label: {
									normal: {
										formatter: '{b} : \n{c}',
										//formatter: '{b} : {c}',
										//position: 'inside',
									}
								},
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}],
							color: ['#9966ff', '#669900', '#3366ff']
						};
						myChart5.setOption(deviceStatisticsB);
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});

			$(document).ready(function() {
				myChart5.on('click', function(params) {
					//console.log(params);
					let device = [],
							deviceData = [],
							equipment = [];
						let myChart6 = echarts.init(document.getElementById('myChart6'));
						myChart6.clear();
						$.ajax({
							url: $this.countVisitByEquipment,
							type: 'post',
							dataType: 'json',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({
								"endTime": endTime,
								"startTime": startTime,
								"tracId": tracId,
								"deviceVendor": params.data.name,
								"queryEquipmentType": 1
							}),
							headers: {
								"Authorization": id,
							},
							success: function(res) {
								if(res.statusCode == '401') {
									window.open("../../login.html", "_self");
								} else {
									device = res.data
									for(let i = 0; i < device.length; i++) {
										equipment.push(device[i].equipment);
									};
									for(let i = 0; i < device.length; i++) {
										let arr = {
											name: '',
											value: '',
										};
										arr.name = device[i].equipment;
										arr.value = device[i].effectiveChickNum;
										deviceData.push(arr)
									};
									var deviceStatisticsD = {
										tooltip: {
											trigger: 'item',
											formatter: "{b} : <br/>{c} ({d}%)"
										},
										grid: {
											left: '3%',
											right: '4%',
											//bottom: '0%',
											containLabel: true
										},
										legend: [{
											data: equipment,
											x: '25%',
											y: '75%',
											orient: 'vertical',
											textStyle: {
												fontSize: 12
											},
										}],
										series: [{
											//name: '运营商占比',
											type: 'pie',
											radius: '60%',
											center: ['50%', '40%'],
											data: deviceData,
											label: {
												normal: {
													formatter: '{b} : \n{c}',
													//formatter: '{b} : {c}',
													//position: 'inside',
												}
											},
											itemStyle: {
												emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
											}
										}],
										color: ['#9966ff', '#669900', '#3366ff']
									};
									myChart6.setOption(deviceStatisticsD);
								}
							},
							error: function(err) {
								console.log(err);
								$("#load").remove();
							}
						});									
				});
				$(window).resize(function() {
					myChart5.resize();
					try {} catch(err) {
						return false;
					}
				});
				//var height = $('#rightTable').get(0).scrollHeight;
				//$('#leftMenu_Box').css('height', height)
			});
		},
		deviceStatisticsC: function(startTime, endTime) {
			var $this = this;
			let device = [],
				deviceData = [],
				equipment = [];
				let myChart6 = echarts.init(document.getElementById('myChart6'));
			myChart6.clear();
			$.ajax({
				url: $this.countVisitByEquipment,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"endTime": endTime,
					"startTime": startTime,
					"tracId": tracId,
					"queryEquipmentType": 1
				}),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						device = res.data
						for(let i = 0; i < device.length; i++) {
							equipment.push(device[i].equipment);
						};
						for(let i = 0; i < device.length; i++) {
							let arr = {
								name: '',
								value: '',
							};
							arr.name = device[i].equipment;
							arr.value = device[i].effectiveChickNum;
							deviceData.push(arr)
						};
						var deviceStatisticsC = {
							tooltip: {
								trigger: 'item',
								formatter: "{b} : <br/>{c} ({d}%)"
							},
							grid: {
								left: '3%',
								right: '4%',
								//bottom: '0%',
								containLabel: true
							},
							legend: [{
								data: equipment,
								x: '25%',
								y: '75%',
								orient: 'vertical',
								textStyle: {
									fontSize: 12
								},
							}],
							series: [{
								//name: '运营商占比',
								type: 'pie',
								radius: '60%',
								center: ['50%', '40%'],
								data: deviceData,
								label: {
									normal: {
										formatter: '{b} : \n{c}',
										//formatter: '{b} : {c}',
										//position: 'inside',
									}
								},
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}],
							color: ['#9966ff', '#669900', '#3366ff']
						};
						myChart6.setOption(deviceStatisticsC);
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});

			$(document).ready(function() {
				
				$(window).resize(function() {
					myChart6.resize();
					try {} catch(err) {
						return false;
					}
				});
				//var height = $('#rightTable').get(0).scrollHeight;
				//$('#leftMenu_Box').css('height', height)
			});
		},
		regionStatistics: function(data) {
			var $this = this;
			let region = [],
				yDataa = [],
				regionTop = [],
				fisrt = null;
			var myChart4 = echarts.init(document.getElementById('myChart4'));
			myChart4.clear();
			$.ajax({
				url: $this.countVisitByCity,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						region = res.data
						//	console.log(region[0].name)
						//						region.sort(function(o1, o2) {
						//							if(isNaN(o1.value) || o1.value == null) return -1;
						//							if(isNaN(o2.value) || o2.value == null) return 1;
						//							return o1.value - o2.value;
						//						});
						for(var i = 0; i < 10; i++) {
							regionTop.push(region[i]);
							yDataa.push(region[i].name);
						}
						//						for(var i = 0; i < 10; i++) {
						//							yDataa.push(region[i].name);
						//						}
						//						for(var i = 9; i < -1; i--) {
						//							regionTop.push(region[i]);
						//	}
						fisrt = region[0].value;
						var regionStatistics = {
							title: {
								text: '访问IP归属TOP10',
								textStyle: {
									fontSize: 20
								},
								left: 180,
								top: 30
							},
							tooltip: {
								show: true,
								formatter: function(params) {
									return params.name + '：' + params.data['value'] + '次'
								},
							},
							visualMap: {
								type: 'continuous',
								//text: ['', ''],
								showLabel: true,
								seriesIndex: [0],
								text: ["高", "低"],
								calculable: true,
								min: 0,
								max: fisrt,
								inRange: {
									//color: ['#8dd0eb', '#bae48f', '#fef901', '#ff9500', '#ff5a00', ]
									//color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
									color: ['lightskyblue', 'yellow', 'red']
								},
								textStyle: {
									color: '#000'
								},
								bottom: 30,
								right: '5%',
							},
							grid: {
								left: '10%',
								top: 60,
								bottom: 30,
								width: '20%'
							},
							xAxis: {
								show: false
							},
							yAxis: {
								type: 'category',
								inverse: true,
								nameGap: 16,
								axisLine: {
									show: false,
									lineStyle: {
										color: '#ddd'
									}
								},
								axisTick: {
									show: false,
									lineStyle: {
										color: '#ddd'
									}
								},
								axisLabel: {
									interval: 0,
									margin: 85,
									textStyle: {
										color: '#455A74',
										align: 'left',
										fontSize: 14
									},
								},
								data: yDataa
							},
							geo: {
								roam: false,
								//roam: !1,
								map: 'china',
								left: '34%',
								top: '10%',
								//right: '10%',
								//bottom: '10%',
								layoutSize: '80%',
								zoom: 1.23,
								label: {
									normal: {
										show: !0,
										// fontSize: "14",
										color: "rgba(0,0,0,0.7)"
									}
								},
								//					label: {
								//						emphasis: {
								//							show: false
								//						}
								//					},
								itemStyle: {
									normal: {
										//shadowBlur: 50,
										//shadowColor: 'rgba(0, 0, 0, 0.2)',
										borderColor: "rgba(0, 0, 0, 0.2)"
									},
									emphasis: {
										areaColor: '#fff464'
									}
								},
								regions: [{
									name: '南海诸岛',
									value: 0,
									itemStyle: {
										normal: {
											opacity: 1,
											label: {
												show: false
											}
										}
									}
								}],
							},
							series: [{
									name: 'mapSer',
									type: 'map',
									roam: false,
									geoIndex: 0,
									label: {
										show: false,
									},
									data: region
								},
								{
									name: 'barSer',
									type: 'bar',
									roam: false,
									visualMap: false,
									zlevel: 2,
									barMaxWidth: 20,
									barGap: 0,
									itemStyle: {
										normal: {
											color: '#40a9ed'
										},
										emphasis: {
											color: "#3596c0"
										}
									},
									label: {
										normal: {
											show: true,
											position: 'right',
											//offset: [0, 10]
										},
										emphasis: {
											show: true,
											position: 'right',
											//offset: [10, 0]
										}
									},
									data: regionTop
								}
							]
						};
						myChart4.setOption(regionStatistics);

					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
			$(document).ready(function() {
				$(window).resize(function() {
					myChart4.resize();
					try {} catch(err) {
						return false;
					}
				});
			});
		},
		phoneStatistics: function(startTime, endTime, numc) {
			var $this = this;
			let region = [],
				yDataa = [],
				regionTop = [],
				fisrt = null,
				topNum = null;
			var myChart4 = echarts.init(document.getElementById('myChart4'));
			myChart4.clear();
			$.ajax({
				url: $this.countMobileByCity,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"endTime": endTime,
					"startTime": startTime,
					"tracId": tracId,
					"queryType": numc
				}),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						region = res.data
						//console.log(region)
						//						region.sort(function(o1, o2) {
						//							if(isNaN(o1.value) || o1.value == null) return -1;
						//							if(isNaN(o2.value) || o2.value == null) return 1;
						//							return o1.value - o2.value;
						//						});
						if(numc == '0') {
							topNum = '下发手机号归属TOP10'
						} else {
							topNum = '访问手机号归属TOP10'
						}
						for(var i = 0; i < 10; i++) {
							regionTop.push(region[i]);
							yDataa.push(region[i].name);
						}
						//						for(var i = 0; i < 10; i++) {
						//							yDataa.push(region[i].name);
						//						}
						//						for(var i = 9; i < -1; i--) {
						//							regionTop.push(region[i]);
						//	}
						fisrt = region[0].value;
						var phoneStatistics = {
							title: {
								text: topNum,
								textStyle: {
									fontSize: 20
								},
								left: 180,
								top: 30
							},
							tooltip: {
								show: true,
								formatter: function(params) {
									return params.name + '：' + params.data['value'] + '次'
								},
							},
							visualMap: {
								type: 'continuous',
								//text: ['', ''],
								showLabel: true,
								seriesIndex: [0],
								text: ["高", "低"],
								calculable: true,
								min: 0,
								max: fisrt,
								inRange: {
									//color: ['#8dd0eb', '#bae48f', '#fef901', '#ff9500', '#ff5a00', ]
									//color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
									color: ['lightskyblue', 'yellow', 'red']
								},
								textStyle: {
									color: '#000'
								},
								bottom: 30,
								right: '5%',
							},
							grid: {
								left: '10%',
								top: 60,
								bottom: 30,
								width: '20%'
							},
							xAxis: {
								show: false
							},
							yAxis: {
								type: 'category',
								inverse: true,
								nameGap: 16,
								axisLine: {
									show: false,
									lineStyle: {
										color: '#ddd'
									}
								},
								axisTick: {
									show: false,
									lineStyle: {
										color: '#ddd'
									}
								},
								axisLabel: {
									interval: 0,
									margin: 85,
									textStyle: {
										color: '#455A74',
										align: 'left',
										fontSize: 14
									},
								},
								data: yDataa
							},
							geo: {
								roam: false,
								//roam: !1,
								map: 'china',
								left: '34%',
								top: '10%',
								//right: '10%',
								//bottom: '10%',
								layoutSize: '80%',
								zoom: 1.23,
								label: {
									normal: {
										show: !0,
										// fontSize: "14",
										color: "rgba(0,0,0,0.7)"
									}
								},
								//					label: {
								//						emphasis: {
								//							show: false
								//						}
								//					},
								itemStyle: {
									normal: {
										//shadowBlur: 50,
										//shadowColor: 'rgba(0, 0, 0, 0.2)',
										borderColor: "rgba(0, 0, 0, 0.2)"
									},
									emphasis: {
										areaColor: '#fff464'
									}
								},
								regions: [{
									name: '南海诸岛',
									value: 0,
									itemStyle: {
										normal: {
											opacity: 1,
											label: {
												show: false
											}
										}
									}
								}],
							},
							series: [{
									name: 'mapSer',
									type: 'map',
									roam: false,
									geoIndex: 0,
									label: {
										show: false,
									},
									data: region
								},
								{
									name: 'barSer',
									type: 'bar',
									roam: false,
									visualMap: false,
									zlevel: 2,
									barMaxWidth: 20,
									barGap: 0,
									itemStyle: {
										normal: {
											color: '#40a9ed'
										},
										emphasis: {
											color: "#3596c0"
										}
									},
									label: {
										normal: {
											show: true,
											position: 'right',
											//offset: [0, 10]
										},
										emphasis: {
											show: true,
											position: 'right',
											//offset: [10, 0]
										}
									},
									data: regionTop
								}
							]
						};
						myChart4.setOption(phoneStatistics);

					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
			$(document).ready(function() {
				$(window).resize(function() {
					myChart4.resize();
					try {} catch(err) {
						return false;
					}
				});
			});
		},
		prev: function() {
			var $this = this;
			let times, date, month, year;
			times = new Date($this.time).getTime() - 86400000;
			date = new Date(times).getDate();
			month = new Date(times).getMonth() + 1;
			year = new Date(times).getFullYear();
			if(date < 10) {
				date = '0' + date;
			}
			if(month < 10) {
				month = '0' + month;
			}
			$this.time = year + '-' + month + '-' + date;
			$this.hourStatistics($this.time);
		},
		next: function() {
			var $this = this;
			let times, date, month, year;
			times = new Date($this.time).getTime() + 86400000;
			date = new Date(times).getDate();
			month = new Date(times).getMonth() + 1;
			year = new Date(times).getFullYear();
			if(date < 10) {
				date = '0' + date;
			}
			if(month < 10) {
				month = '0' + month;
			}
			$this.time = year + '-' + month + '-' + date;
			$this.hourStatistics($this.time);
		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		//bus.$on("getAid", function(updata) {
		//注意this指向问题
		// $this.sellerid = updata.sellerid;
		// $this.auctionid = updata.auctionid;
		//});
	},
});