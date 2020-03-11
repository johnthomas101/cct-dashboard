import React, { Component } from "react";
import * as d3 from "d3";

class ReactBar extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  state = {
    bars: [],
    margin: {},
    xScale: d3.scaleTime(),
    yScale: d3.scaleLinear(),
    parseTime: d3.timeParse("%Y-%m-%d"),
    parseRealTime: d3.timeParse("%Y-%m-%d %H:%M:%S"),
    chartName: "Bar Chart (with React)",
    id: "bar_react"
  };

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .ticks(d3.timeDay)
    .tickSizeOuter(0)
    .ticks(6);
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickSizeOuter(0);

  static getDerivedStateFromProps(props, state) {
    if (!props.config) return null;

    const { config } = props;
    const data = JSON.parse(JSON.stringify(config.data));
    const barConfig = config.config;
    const xScale = state.xScale;
    const yScale = state.yScale;
    const parseTime =
      props.realtime !== null && props.realtime !== undefined
        ? state.parseRealTime
        : state.parseTime;

    data.forEach(function(d) {
      d.date = parseTime(d.date);
    });

    const xDomain = d3.extent(data, d => d.date);
    const yMax = d3.max(data, d => d.value);

    xScale.range([
      barConfig.margin.left + barConfig.margin.right,
      barConfig.width - barConfig.margin.right - barConfig.margin.right
    ]);
    yScale.range([
      barConfig.height - barConfig.margin.bottom,
      barConfig.margin.top
    ]);

    xScale.domain(xDomain);
    yScale.domain([0, yMax * 1.1]);

    const bars = data.map((d, iteration) => {
      return {
        x: xScale(d.date) - barConfig.width / data.length / 2 / 2,
        y: yScale(d.value),
        height: barConfig.height - barConfig.margin.bottom - yScale(d.value),
        width: barConfig.width / data.length / 2,
        fill: barConfig.fill,
        __data__: d
      };
    });

    return { bars, xScale, yScale, margin: barConfig.margin };
  }

  componentDidMount() {
    this.yAxis.tickSizeInner(-this.props.config.config.width);
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
    d3.select(this.refs.yAxis)
      .selectAll(".tick line")
      .style("stroke", "#ecf0f1")
      .style("stroke-width", "1");

    // console.log(this.state);

    // let state = {...this.state};
    // let props = {...this.props};

    // d3.select(this.refs.svg).selectAll('rect')
    //     .transition().duration(800)
    //     .attr("y", function(d) {
    //         var data = JSON.parse(this.getAttribute("data"));
    //         return state.yScale(data.Value);
    //     })
    //     .attr("height", function(d) {
    //         var data = JSON.parse(this.getAttribute("data"));
    //         return props.config.config.height - props.config.config.margin.bottom - state.yScale(data.value);
    //     })
    //     .delay(function(d,i){return(i*100)})

    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("z-index", 1000)
      .style("background-color", "#000")
      .style("color", "#fff")
      .style("padding", "10px");

    d3.select(this.refs.xAxisLabel)
      .attr(
        "transform",
        "translate(" +
          this.props.config.config.width / 2 +
          "," +
          this.props.config.config.height +
          ")"
      )
      .text("Group");

    d3.select(this.refs.yAxisLabel)
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - this.props.config.config.height / 2)
      .attr("dy", "1em")
      .text("Count");

    let state = this.state;
    let props = this.props;

    d3.select(this.refs.svg)
      .selectAll("rect")
      .attr(
        "y",
        props.config.config.height -
          props.config.config.margin.bottom -
          state.yScale(0)
      )
      .transition()
      .duration(800)
      .attr("y", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        return state.yScale(data.value);
      })
      .attr("height", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        return (
          props.config.config.height -
          props.config.config.margin.bottom -
          state.yScale(data.value)
        );
      })
      .delay(function(d, i) {
        return i * 10;
      });

    d3.select(this.refs.svg)
      .selectAll("rect")
      .on("mouseover", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        var date = data.date;
        var value = data.value;
        div
          .transition()
          .duration(200)
          .style("opacity", 0.9);

        div
          .html(
            "Date: " +
              new Date(date).toDateString() +
              "<br/>" +
              "Value: " +
              value
          )
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.config.data !== this.props.config.data ||
      nextProps.config.config !== this.props.config.config
    );
  }

  componentDidUpdate() {
    this.container.current.append(this.refs.svg);
    this.yAxis.tickSizeInner(-this.props.config.config.width);
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
    d3.select(this.refs.yAxis)
      .selectAll(".tick line")
      .style("stroke", "#ecf0f1")
      .style("stroke-width", "1");

    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    let state = this.state;
    let props = this.props;

    d3.select(this.refs.svg)
      .selectAll("rect")
      .attr("height", 0)
      .transition()
      .duration(250)
      .attr("y", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        return state.yScale(data.value);
      })
      .attr("height", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        return (
          props.config.config.height -
          props.config.config.margin.bottom -
          state.yScale(data.value)
        );
      })
      .delay(function(d, i) {
        return i * 10;
      });

    d3.select(this.refs.svg)
      .selectAll("rect")
      .on("mouseover", function(d) {
        var data = JSON.parse(this.getAttribute("data"));
        var date = data.date;
        var value = data.value;
        div
          .transition()
          .duration(200)
          .style("opacity", 0.9);

        div
          .html(
            "Date: " +
              new Date(date).toDateString() +
              "<br/>" +
              "Value: " +
              value
          )
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  render() {
    return (
      <div ref={this.container}>
        <svg
          viewBox={`0 0 ${this.props.config.config.width} ${
            this.props.config.config.height
          }`}
          ref={"svg"}
        >
          <g
            ref="xAxis"
            className="x axis"
            transform={`translate(0, ${this.props.config.config.height -
              this.props.config.config.margin.bottom})`}
          />
          <text ref="xAxisLabel" style={{ textAnchor: "middle" }} />
          <g
            ref="yAxis"
            className="y axis"
            transform={`translate(${this.props.config.config.margin.left}, 0)`}
          />
          <text ref="yAxisLabel" style={{ textAnchor: "middle" }} />
          {this.state.bars.map((d, i) => {
            return (
              // <rect key={i} x={d.x} y={d.y} height={d.height} width={d.width} fill={d.fill} data={JSON.stringify(d.__data__)} />
              <rect
                key={i}
                x={d.x}
                y={d.y}
                width={d.width}
                fill={d.fill}
                data={JSON.stringify(d.__data__)}
              />
            );
          })}
        </svg>
      </div>
    );
  }
}

export default ReactBar;
