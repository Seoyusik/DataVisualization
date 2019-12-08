d3.csv("./traffic.csv", function(error, data) {
  var dataSet = [0, 0, 0, 0, 0];
  var labelName = ["횡단중", "길가장자리구역통행중", "차도통행중", "보도통행중", "기타"];

  for (var i = 0; i < data.length; i++) {
    if(data[i].사고유형_대분류=="차대사람"){
      var day = data[i].사고유형_중분류;
      if (day == "횡단중") {
      dataSet[0]++;
    } else if (day == "길가장자리구역통행중") {
      dataSet[1]++;
    } else if (day == "차도통행중") {
      dataSet[2]++;
    } else if (day == "보도통행중") {
      dataSet[3]++;
    } else if (day == "기타") {
      dataSet[4]++;
    }
  }
  }

  var svgEle = document.getElementById("myGraph"); // ?
  var svgWidth = window.getComputedStyle(svgEle, null)
    .getPropertyValue("width"); // ?
  var svgHeight = window.getComputedStyle(svgEle, null)
    .getPropertyValue("height");

  svgWidth = parseFloat(svgWidth);
  svgHeight = parseFloat(svgHeight);

  var offsetX = 60;
  var offsetY = 30;
  var barElements;
  var dataMax = 1000;
  var barWidth = 70;
  var barMargin = 23;

  // 그래프 그리기(그래프 옵션)
  barElements = d3.select("#myGraph")
    .selectAll("rect")
    .data(dataSet)

  // 데이터가 추가될 때
  barElements.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", 0)
    .attr("width", barWidth)
    .attr("x", function(d, i) {
      return i * (barWidth + barMargin) + offsetX + barMargin; // 처음 y축과의 간격
    })
    .attr("y", svgHeight - offsetY)

    // 애니메이션 처리
    .transition()
    .duration(1000) //1초동안 애니메이션 처리

    //.delay(function(d, i) {
    //  return i * 400; //0.4초 대기
    //})

    .attr("y", function(d, i) { //Y 좌표를 지정
      return svgHeight - (7*d)/10 - offsetY; //Y 좌표를 계산
    })
    .attr("height", function(d, i) { //넓이설정.2번째의 파라미터에 함수지정
      return (7*d)/10; //데이터 값을 그대로 높이로 지정
    })

  // text 요소 지정
  barElements.enter()
    .append("text") //text 요소 추가
    .attr("class", "barNum") //CSS 클래스를 지정
    .attr("x", function(d, i) { //X 좌표를 지정함
      //막대그래프의 표시 간격을 맞춤
      return i * (barWidth + barMargin) + offsetX + (barWidth / 2 + barMargin);
    })
    .attr("y", svgHeight - 5 - offsetY) //Y 좌표 출력 위치 지정
    .text(function(d, i) { //데이터 표시
      return d;
    });

    var yScale = d3.scale
    .linear() //스케일 설정
    .domain([0, dataMax]) //원래크기
    .range([dataMax, 300]); //실제 출력 크기

    var axis = d3.svg.axis()
    .orient('left')
    .scale(yScale);

  //세로(Y축) 방향의 눈금을 설정하고 표시
  d3.select("#myGraph")
    .append("g")
    .attr("class", "axis")
    .attr("transform",
      "translate(" + offsetX + "," + ((svgHeight - dataMax) - offsetY) + ")")
    .call(axis) //스케일 적용
    //.ticks(10) //눈금의 표시 위치를 왼쪽으로 지정

  //가로(X축) 방향의 선을 표시
  d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis_x")
    .attr("width", svgWidth)
    .attr("height", "1")
    .attr("transform",
      "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")

  //막대의 레이블을 표시
  barElements.enter()
    .append("text")
    .attr("class", "barName")
    .attr("x", function(d, i) { //X좌표 지정
      return i * (barWidth + barMargin) + offsetX + (barWidth / 2 + barMargin); //막대그래프의 표시 간격을 맞춤
    })
    .attr("y", svgHeight - offsetY + barMargin)
    .text(function(d, i) {
      return labelName[i]; //레이블 이름을 반환
    })
});
