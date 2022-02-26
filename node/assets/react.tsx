import React from 'react';
export class Square extends React.Component {
  render() {
    return (
      <button className="square">
        中文
      </button>
			// 就安静安静安静
    );
  }
}

export function Square2() {
	let a = 1;
	const template = `${a}啦啦啦`;
	const template2 = `啦啦啦吼吼吼`;
  return (
		<>
			{/* <div>近似的骄傲</div> */}
			<button className="square">
				中文2
			</button>	
		</>
    
  );
}