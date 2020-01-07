import React from 'react';
import './FeedWedge.scss';

const FeedWedge = props => {

	let histogram_container = React.createRef();

	let histogram_width = 1000;
	//let histogram_width = props.covers.length * 32;
	let histogram_bar_width = 24;
	let histogram_bar_padding = 8;
	let histogram_bar_spacing = (histogram_bar_padding * 2) + histogram_bar_width;
	let histogram_viewbox = "0 0 " + histogram_width + " 224";
	let histogram_residual_bars = [];
	let histogram_cover_bars = [];
	let histogram_x = histogram_bar_padding*2;
	let histogram_residual = props.post/32;

	let apc = 0;

	for (let i = 0; i < props.covers.length; i++) {
		apc += props.covers[i].value;
		let available = (props.covers[i].cover)/32;
		let avail_y = 192 - available;
		histogram_cover_bars.push(
			<rect x={histogram_x} y={avail_y} className="fw_bar_available" width={histogram_bar_width} height={available} key={props.covers[i].name} data-name={props.covers[i].name} data-cover={props.covers[i].cover} />
		)
		avail_y = 192 - histogram_residual;
		histogram_residual_bars.push(
			<rect x={histogram_x} y={avail_y} className="fw_bar_residual" width={histogram_bar_width} height={histogram_residual} key={props.covers[i].name + "_residual"} data-name={props.covers[i].name} data-cover={props.post} />
		)
		histogram_x += histogram_bar_spacing;
	}

	apc = apc/props.covers.length;

	let target_start = 192 - (props.pre/32);
	let target_end = 192 - (props.post/32);

	let target_line = <line className="fw_target" x1="4" y1={target_start} x2={histogram_width} y2={target_end} strokeWidth="2" />

	function sliderController(e) {
		e.preventDefault();
		let container = histogram_container.current;
		let total = container.scrollWidth - container.offsetWidth;
		let percentage = total*(e.target.value/100);
		container.scrollLeft = percentage;
	}


  return (
	<div className="fw_container">
		<svg	className="y_axis"
				height="224"
				width="96"
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 96 224" >


			<line className="st0" x1="96" y1="32" x2="96" y2="192"/>

			<line className="st0" x1="88" y1="32" x2="96" y2="32"/>
			<line className="st0" x1="88" y1="64" x2="96" y2="64"/>
			<line className="st0" x1="88" y1="96" x2="96" y2="96"/>
			<line className="st0" x1="88" y1="128" x2="96" y2="128"/>
			<line className="st0" x1="88" y1="160" x2="96" y2="160"/>
			<line className="st0" x1="88" y1="192" x2="96" y2="192"/>

			<text transform="matrix(1 0 0 1 76.5249 196.6959)" className="st1 st2">0</text>
			<text transform="matrix(1 0 0 1 52.4108 164.6963)" className="st1 st2">1,000</text>
			<text transform="matrix(1 0 0 1 50.1496 36.6961)" className="st1 st2">5,000</text>
			<text transform="matrix(1 0 0 1 50.4479 68.6961)" className="st1 st2">4,000</text>
			<text transform="matrix(1 0 0 1 50.6427 100.696)" className="st1 st2">3,000</text>
			<text transform="matrix(1 0 0 1 50.6558 132.6962)" className="st1 st2">2,000</text>
			<text transform="matrix(6.123234e-17 -1 1 6.123234e-17 26.6456 137.9932)" className="st1 st2">kg/DM/ha</text>
			

		</svg>
		<div className="fw_histogram_container" ref={histogram_container}>
			<h5>Average Pasture Cover: {apc}kg/Dm/ha</h5>
			<ul className="fw_legend">
				<li><div className="fw_legend_residual fw_legend_icon"></div>Residual</li>
				<li><div className="fw_legend_available fw_legend_icon"></div>Available</li>
				<li><div className="fw_legend_predicted fw_legend_icon"></div>Predicted Growth</li>
			</ul>

			<svg	className="y_axis"
					height="224"
					width={histogram_width}
					version="1.1" 
					xmlns="http://www.w3.org/2000/svg" 
					viewBox={histogram_viewbox} >
				
			
				<line className="st0a" x1="0" y1="32" x2={histogram_width} strokeDasharray="2 2" y2="32"/>
				<line className="st0a" x1="0" y1="64" x2={histogram_width} strokeDasharray="2 2" y2="64"/>
				<line className="st0a" x1="0" y1="96" x2={histogram_width} strokeDasharray="2 2" y2="96"/>
				<line className="st0a" x1="0" y1="128" x2={histogram_width} strokeDasharray="2 2" y2="128"/>
				<line className="st0a" x1="0" y1="160" x2={histogram_width} strokeDasharray="2 2" y2="160"/>

				<line className="st0" x1={histogram_width} y1="32" x2={histogram_width} y2="192"/>

				{histogram_cover_bars}
				{histogram_residual_bars}
				{target_line}

				<line className="st0" x1="0" y1="192" x2={histogram_width} y2="192"/>

			</svg>
			<h6 className="st1 st2">Paddocks</h6>
		</div>
		<div className="fw_view_slider">
			<input type="range" min="1" max="100" className="fw_slider" defaultValue="1" onChange={sliderController} />
			<svg className="fw_mini_view"
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" >
			</svg>
		</div>
	</div>
	)
};



export default FeedWedge;
