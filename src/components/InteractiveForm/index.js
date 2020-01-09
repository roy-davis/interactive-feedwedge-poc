import React from 'react';
import FeedWedge from "../FeedWedge/";
import './InteractiveForm.scss';


class InteractiveForm extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			growth: 20,
			pre: 2500,
			post: 1500,
			days: 7,
			grazing_rate: 2,
			show_growth: false,
			show_target: false,
			estimate_comsumption: false,
			estimate_surplus: false,
		};

	}

	updatePost(e) {
		this.setState({post: e.target.value})
	}

	updatePre(e) {
		this.setState({pre: e.target.value})
	}

	updateGrowth(e) {
		this.setState({growth: e.target.value})
	}

	updateDays(e) {
		this.setState({days: e.target.value})
	}

	updateGrazingRate(e) {
		this.setState({grazing_rate: e.target.value})
	}

	updateShowTarget(e) {
		this.setState({show_target: e.target.checked})
	}

	updateShowGrowth(e) {
		this.setState({show_growth: e.target.checked})
	}

	updateConsumption(e) {
		this.setState({estimate_comsumption: e.target.checked})
	}

	updateSurplus(e) {
		this.setState({estimate_surplus: e.target.checked})
	}


	render() {

		return (
			<div className="content">
				<FeedWedge covers={this.props.cover_data} 
							growth={this.state.growth} 
							post={this.state.post} 
							pre={this.state.pre} 
							days={this.state.days} 
							grazing_rate={this.state.grazing_rate} 
							show_growth={this.state.show_growth} 
							show_target={this.state.show_target}
							estimate_comsumption={this.state.estimate_comsumption} 
							estimate_surplus={this.state.estimate_surplus}
							/>
				<div>
					<p>
						<input type="checkbox" 
								className="add_target" 
								onChange={this.updateShowTarget.bind(this)}
								/>Add Pre-grazing target of 
						<input type="number" 
								step="100" 
								value={this.state.pre} 
								onChange={this.updatePre.bind(this)} /> kg/DM
					</p>
					<p>and Post-grazing target of <input type="number" 
															step="100" 
															value={this.state.post} 
															onChange={this.updatePost.bind(this)} 
															/> kg/DM</p>
				</div>
				<div>
					<p><input type="checkbox" className="add_growth" onChange={this.updateShowGrowth.bind(this)} />Add growth <input type="number" value={this.state.days} onChange={this.updateDays.bind(this)} /> days at <input type="number" value={this.state.growth} onChange={this.updateGrowth.bind(this)}/> kg/DM/day</p>
				</div>
				<div>
					<p><input type="checkbox" className="estimate_grazings" onChange={this.updateConsumption.bind(this)} />Estimate paddocks grazed at <input type="number" value={this.state.grazing_rate} onChange={this.updateGrazingRate.bind(this)} /><select><option>ha/day</option></select></p>
				</div>
				<div>

					<p><input type="checkbox" className="estimate_deficit" onChange={this.updateSurplus.bind(this)} />Estimate feed deficits/surplus</p>
				</div>
			</div>

		)
	}
}

/*

    <label className="custom_checkbox">Three
      <input type="checkbox"  />
      <span className="checkmark"></span>
    </label>
    */

export default InteractiveForm;
