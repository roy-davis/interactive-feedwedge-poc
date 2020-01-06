import React from 'react';
import './FeedWedge.scss';

const FeedWedge = ({paddocks}) => {

  return (
      <div className="feedwedgeContainer">

<svg version="1.1"
     baseProfile="full"
     width="150" height="400"
     xmlns="http://www.w3.org/2000/svg">

</svg>

        { paddocks && paddocks.paddockList && paddocks.paddockList.length &&

/*
          {paddocks.bullList.map((bull, key) => {
            return (
                <tr key={key}>
                  <td>{bull.name}</td>
                  <td>{bull.abCode}</td>
                  <td>{bull.breed1}</td>
                  <td>{bull.marketer}</td>
                </tr>
            )
          })}
*/
        }

        <div className="legend">

        </div>

      </div>
  )
};

function mapStateToProps(state) {
  const { paddocks } = state;
  return {
    paddocks
  };
}

export default connect(mapStateToProps)(FeedWedge);