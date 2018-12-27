// import React from 'react';
// import './errorView.css'

// export default class ErrorView extends React.Component {
//     // 返回上一页
//     goBack() {
//         window.history.go(-1)
//     }
//     render() {
//         return (
//             <div className="error-view">
//                 <div className="error">
//                     <h1 className="header">404. 抱歉! 您访问的资源不存在!</h1>
//                     <div className="content">
//                         <p>
//                             <strong>你似乎来到了没有知识存在的荒原…</strong>
//                         </p>
//                         <p>来源链接是否正确？用户、话题或问题是否存在？</p>
//                         <hr />
//                         <p>
//                             <a href="http://localhost:3000/nav">返回首页</a>
//                             <span>或者</span>
//                             <a href="##" onClick={this.goBack.bind(this)}>返回上页</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
import React from 'react'
import './style.css'

class ErrorPage extends React.Component {
  componentDidMount(){
    this.error404()
  }
  componentWillUnmount(){
    window.cancelAnimationFrame(this.myReq)
  }
  error404 = ()=>{
    const c = document.getElementById("canv");
    const $ = c.getContext("2d");
    const w = c.width;
    const h = c.height;
    const id = $.createImageData(w, h);
    const _this = this
    function draw() {
      _this.myReq = window.requestAnimationFrame(draw);
      let r;
      for (let p = 4 * (w * h - 1); p >= 0; p -= 4) {
        r = Math.random();
        id.data[p] = id.data[p+1] = id.data[p+2] = 255 * Math.pow(r, 1.6);
        id.data[p+3] = 255;
      }
      $.putImageData(id, 0, 0);
    }
    draw();
  }
  render () {
    return (
      <div style={styles.bg} className='error404'>
        <svg className="overlay text" viewBox="0 0 900 400">
          <symbol id="main">
            <text textAnchor="middle" x="50%" y="50%" dy="0.25em" className="txt">404</text>
            <text textAnchor="middle" x="50%" y="90%" dy="0.25em" className="txt2">Not Found</text>
          </symbol>
          <mask id="msk" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <rect width="100%" height="100%" className="wrap">
            </rect>
            <use xlinkHref="#main" className="mtxt"/>
          </mask>
        </svg>
        <section>
          <h1 href="#">
            <div className="fill">
              <canvas id="canv" width="460" height="360" style={{background: 'hsla(0, 0, 0, 1)'}}>
              </canvas>
            </div>
            <svg viewBox="0 0 900 400" className="inv">
              <rect width="100%" height="100%" mask="url(#msk)"
                    className="rect"/>
              <use xlinkHref="#main" className="clear"/>
            </svg>
          </h1>
        </section>
      </div>
    )
  }
}

const styles = {
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
}
export default ErrorPage