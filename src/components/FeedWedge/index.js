import React from 'react';
import './FeedWedge.scss';


class FeedWedge extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			histogram_width: 1000,
			histogram_container_width: 500,
		};

		this.histogram_container = React.createRef();
		this.sliderController = this.sliderController.bind(this);
	}

	componentDidMount(){

		this.setState({
			histogram_width: (this.props.covers.length * 40) + 16,
			histogram_container_width: this.histogram_container.current.offsetWidth,
		});
	}

	componentDidUpdate(props){

	}


	sliderController(e) {
		e.preventDefault();
		const container = this.histogram_container.current;
		const total = (container.scrollWidth - container.offsetWidth);
		const percentage = total*(e.target.value/100);
		container.scrollLeft = percentage;


	}

	sortPaddocks (a, b) {
		if (a.cover > b.cover) {
			return -1;
		}
		if (b.cover > a.cover) {
			return 1;
		}
		return 0;
	}

	render() {

		let paddocks = JSON.parse(JSON.stringify(this.props.covers));
		
		paddocks.sort(this.sortPaddocks);

		if (this.props.estimate_comsumption) {
			const total_ha = this.props.grazing_rate * this.props.days;
			let ha_tally = 0;
			for (let i = 0; i < paddocks.length; i++) {
				let entry = paddocks[i];
				if (ha_tally < total_ha) {
					ha_tally += paddocks[i].ha;
					paddocks[i].cover = this.props.post;
				} 
			}
			paddocks.sort(this.sortPaddocks);
		}


		const histogram_growth_bars = [];
		const histogram_residual_bars = [];
		const histogram_cover_bars = [];
		const mini_map_cover = [];
		const mini_map_growth = [];
		const mini_map_residual = [];


		const histogram_bar_width = 24;
		const histogram_bar_padding = 8;

		let apc_tally = 0;

		
		let histogram_x = histogram_bar_padding * 2;

		const	target_start = 192 - (this.props.pre/32);
		const	target_end = 192 - (this.props.post/32);

		const	histogram_bar_spacing = (histogram_bar_padding * 2) + histogram_bar_width;
		const	histogram_residual = this.props.post/32;

		const	minimap_chunks = ((this.state.histogram_container_width - 16 )/paddocks.length);
		const minimap_spacing = minimap_chunks / 3 ;
		let minimap_x = 10;
		const minimap_width = minimap_spacing * 2;
		const	minimap_residual = (this.props.post)/96;
		const	slider_handle_width = (this.state.histogram_container_width / histogram_bar_spacing) * (minimap_chunks);

		let growth = null;

		for (let i = 0; i < paddocks.length; i++) {
	
			// main histogram
			apc_tally += paddocks[i].cover;
			let available = (paddocks[i].cover)/32;
			let avail_y = 192 - available;
			histogram_cover_bars.push(
				<rect x={histogram_x} y={avail_y} className="fw_bar_available" width={histogram_bar_width} height={available} key={paddocks[i].name} data-name={paddocks[i].name} data-cover={paddocks[i].cover} />
			)

			if (this.props.show_growth) {
				growth = ((this.props.growth * this.props.days) + paddocks[i].cover)/32;
				avail_y = 192 - growth;
				histogram_growth_bars.push(
					<rect x={histogram_x} y={avail_y} className="fw_bar_predicted" width={histogram_bar_width} height={growth} key={paddocks[i].name + "_predicted"} data-name={paddocks[i].name} data-cover={paddocks[i].cover} />
				)
			}


			// residual bars
			let residual_height =  (paddocks[i].cover < this.props.post) ?  available : histogram_residual;
			const residual_colour =  (paddocks[i].cover < this.props.post) ?  'fw_bar_residual_danger' : 'fw_bar_residual';

			avail_y = 192 - residual_height;
			histogram_residual_bars.push(
				<rect x={histogram_x} y={avail_y} className={residual_colour} width={histogram_bar_width} height={residual_height} key={paddocks[i].name + "_residual"} data-name={paddocks[i].name} data-cover={this.props.post} />
			)
			histogram_x += histogram_bar_spacing;

			// minimap histogram
			available = (paddocks[i].cover)/96;
			avail_y = 40 - available;
			mini_map_cover.push(
				<rect x={minimap_x} y={avail_y} className="fw_bar_available" width={minimap_width} height={available}  data-name={paddocks[i].name} data-cover={paddocks[i].cover} key={paddocks[i].name + "_minimap"} />
			)

			if (this.props.show_growth) {
				growth = ((this.props.growth * this.props.days) + paddocks[i].cover)/96;
				avail_y = 40 - growth;
				mini_map_growth.push(
					<rect x={minimap_x} y={avail_y} className="fw_bar_predicted" width={minimap_width} height={available}  data-name={paddocks[i].name} data-cover={paddocks[i].cover} key={paddocks[i].name + "_predicted_minimap" } />
				)
			}

			residual_height =  (paddocks[i].cover < this.props.post) ?  available : minimap_residual;
			avail_y = 40 - residual_height;
			mini_map_residual.push(
				<rect x={minimap_x} y={avail_y} className={residual_colour} width={minimap_width} height={residual_height}  data-name={paddocks[i].name} data-cover={paddocks[i].cover} key={paddocks[i].name + "_residual_minimap"} />
			)
			minimap_x += (minimap_spacing + minimap_width);

		}	

		const apc = apc_tally/paddocks.length;

		let target_line = null;
		if( this.props.show_target) {
			target_line = <line className="fw_target" x1="4" y1={target_start} x2={this.state.histogram_width - 8} y2={target_end} strokeWidth="2" />;
		}
		
		const histogram_viewbox= "0 0 " + this.state.histogram_width + " 224";

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
				<div className="fw_histogram_container" ref={this.histogram_container}>
					<h5>Average Pasture Cover: {apc}kg/Dm/ha</h5>
					<ul className="fw_legend">
						<li><div className="fw_legend_residual fw_legend_icon"></div>Residual</li>
						<li><div className="fw_legend_available fw_legend_icon"></div>Available</li>
						<li><div className="fw_legend_residual_danger fw_legend_icon"></div>Over Grazed</li>
						<li><div className="fw_legend_predicted fw_legend_icon"></div>Predicted Growth</li>
					</ul>

					<svg	className="y_axis"
							height="224"
							width={this.state.histogram_width}
							version="1.1" 
							xmlns="http://www.w3.org/2000/svg" 
							viewBox={histogram_viewbox} >
						
					
						<line className="st0a" x1="0" y1="32" x2={this.state.histogram_width} strokeDasharray="2 2" y2="32"/>
						<line className="st0a" x1="0" y1="64" x2={this.state.histogram_width} strokeDasharray="2 2" y2="64"/>
						<line className="st0a" x1="0" y1="96" x2={this.state.histogram_width} strokeDasharray="2 2" y2="96"/>
						<line className="st0a" x1="0" y1="128" x2={this.state.histogram_width} strokeDasharray="2 2" y2="128"/>
						<line className="st0a" x1="0" y1="160" x2={this.state.histogram_width} strokeDasharray="2 2" y2="160"/>

						<line className="st0" x1={this.state.histogram_width} y1="32" x2={this.state.histogram_width} y2="192"/>

						{histogram_growth_bars}
						{histogram_cover_bars}
						{histogram_residual_bars}
						{target_line}

						<line className="st0" x1="0" y1="192" x2={this.state.histogram_width} y2="192"/>

					</svg>
					<h6 className="st1 st2">Paddocks</h6>
				</div>
				<div className="fw_minimap">
					<style dangerouslySetInnerHTML={{
					  __html: '.fw_slider::-webkit-slider-thumb { width:' + slider_handle_width + 'px;}'
					  }}>
					</style>
					<input type="range" min="0" max="100" className="fw_slider" defaultValue="0" onChange={this.sliderController}  />
					<svg className="fw_minimap_view"
						version="1.1" 
						xmlns="http://www.w3.org/2000/svg" >
						{mini_map_growth}
						{mini_map_cover}
						{mini_map_residual}
					</svg>
				</div>
			</div>
		)
	}
}



export default FeedWedge;
