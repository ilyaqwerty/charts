(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(29)},29:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),i=n.n(r),o=n(13),c=n.n(o),u=n(2),l=n(14),s=n(3),h=n(4),p=n(6),f=n(5),d=n(7),m="/temperature",v="/precipitation",b=new(function(){function e(){var t=this;Object(s.a)(this,e),this.worker=new Worker("worker.js"),this.worker.postMessage({type:"init",tPath:m,pPath:v}),this.init=function(){return new Promise(function(e){t.worker.onmessage=function(t){return e(t.data)}})}}return Object(h.a)(e,[{key:"getTemperature",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1881,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2006;return new Promise(function(a){e.worker.postMessage({type:"getTemperature",table:"Temperature",yearFrom:t,yearTo:n}),e.worker.onmessage=function(e){return a(e.data)}})}},{key:"getPrecipitation",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1881,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2006;return new Promise(function(a){e.worker.postMessage({type:"getPrecipitation",table:"Precipitation",yearFrom:t,yearTo:n}),e.worker.onmessage=function(e){return a(e.data)}})}}]),e}());function y(e,t){return b.getTemperature(e,t).catch(function(e){throw e})}function g(e,t){return b.getPrecipitation(e,t).catch(function(e){throw e})}var x=n(11);function T(){var e=Object(a.a)(["\n  border: 1px solid black;\n"]);return T=function(){return e},e}var k=u.b.canvas(T()),w=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.ctx=this.refs.canvas.getContext("2d"),this.ctx.strokeStyle="#000000",this.ctx.lineWidth=1,this.ctx.font="12px Helvetica, Arial"}},{key:"componentDidUpdate",value:function(){this.updateCanvas()}},{key:"shouldComponentUpdate",value:function(e,t){return this.props.data!==e.data}},{key:"drawDash",value:function(e,t){var n=this,a=e/10>1?[-30,-20,-10,0,10,20,30,40]:[0,.4,.8,1.2,1.6,2,2.4,2.8,3.2],r=this.ctx;a.forEach(function(e){var a=n.getYpos(e);r.beginPath(),r.setLineDash([2,15]),r.moveTo(35,a),r.lineTo(t,a),r.stroke(),r.fillText(e,10,a+5)}),r.setLineDash([])}},{key:"drawLabels",value:function(e){var t=this.props,n=t.width,a=t.data,r=this.ctx;r.textAlign="center";for(var i=0;i<a.length;i++){r.fillStyle="#A5C383";var o=a[i],c=.1*n+i*e,u=this.getYpos(o);r.fillRect(c,u,40,16),r.fillStyle="#000000",r.fillText(o,c+20,u+12)}}},{key:"mapRange",value:function(e,t,n){return function(a){return e-.7*e*(a-t)/(n-t)}}},{key:"updateCanvas",value:function(){var e=this,t=this.props,n=t.width,a=t.height,r=t.data;if(r){var i=Math.min.apply(Math,Object(x.a)(r)),o=Math.max.apply(Math,Object(x.a)(r));this.getYpos=this.mapRange(a-100,i,o);var c=Math.round(.8*n/12),u=this.ctx;u.clearRect(0,0,n,a),this.drawDash(o,n),u.beginPath(),r.forEach(function(t,a){var r=.1*n+a*c,i=e.getYpos(t);u.lineTo(r,i),u.stroke(),u.beginPath(),u.moveTo(r,i),u.arc(r,i,2,0,2*Math.PI,!1),u.closePath(),u.fill()}),this.drawLabels(c)}}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.height;return i.a.createElement(k,{ref:"canvas",width:t,height:n},"rdxctfvygbhnj")}}]),t}(r.Component);function j(){var e=Object(a.a)(["\n  width: inherit;\n  display: flex;\n  justify-content: center;\n"]);return j=function(){return e},e}function O(){var e=Object(a.a)(["\n  display: flex;\n  width: 100%;\n  padding: 20px;\n"]);return O=function(){return e},e}function E(){var e=Object(a.a)(["\n  outline: none;\n  display: inline-block;\n  padding: 5px 10px;\n  margin: 5px;\n  cursor: pointer;\n  color: black;\n  border-radius: 4px;\n  \n  font-weight: ",";\n  background: ",";\n  \n  &:disabled{\n    background: #aaa;\n    cursor: default;\n    color: #444\n  }\n  &:hover:enabled{ \n    background: #A5C383;\n  }\n"]);return E=function(){return e},e}var C=u.b.button(E(),function(e){return e.active?"700":"inherit"},function(e){return e.active?"#A5C383":"transparent"}),F=u.b.form(O()),P=u.b.div(j());function S(){var e=Object(a.a)(["\n  color: red;\n  font-size: 10px;\n  position: absolute;\n  bottom: -18px;\n"]);return S=function(){return e},e}function M(){var e=Object(a.a)(["\n  outline: none;\n  padding: 2px 10px 0 2px;\n  flex: 1 0 100%;\n  font-size: 16px;\n  border: none;\n  border-bottom: 2px solid "," \n"]);return M=function(){return e},e}function D(){var e=Object(a.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 10px 20px; \n  position: relative;\n"]);return D=function(){return e},e}var A=u.b.div(D()),I=u.b.input(M(),function(e){return e.error?"red":"#666"}),L=u.b.div(S()),z=function(e){return i.a.createElement(A,null,i.a.createElement(I,e),i.a.createElement(L,null,e.error))},R=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"validateInputs",value:function(){var e=this.props,t=e.yearFrom,n=e.yearTo,a={};return t<1881&&(a.yearFrom="must be greater than or equal to 1881"),n>2006&&(a.yearTo="must be less than or equal to 2006"),n<t&&(a.both="select the correct interval"),a}},{key:"render",value:function(){var e=this.props,t=e.yearFrom,n=e.yearTo,a=e.onChange,r=e.onSubmit,o=this.validateInputs(),c=!!(o.yearFrom||o.yearTo||o.both);return i.a.createElement(F,{onSubmit:r},i.a.createElement(P,null,i.a.createElement(z,{name:"yearFrom",value:t,onChange:a,error:o.yearFrom}),i.a.createElement(z,{name:"yearTo",value:n,onChange:a,error:o.yearTo}),i.a.createElement(C,{type:"submit",disabled:c},"Get")))}}]),t}(r.Component);function Y(){var e=Object(a.a)(["\n  flex-direction: column;\n"]);return Y=function(){return e},e}var H=Object(u.b)(P)(Y()),q=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).onClick=function(e){var t=n.validate(),a=t.yearFrom,r=t.yearTo;"Temperature"===e?y(a,r).then(function(t){n.setState({dataType:e,data:t,yearFrom:a,yearTo:r})}):"Precipitation"===e&&g(a,r).then(function(t){n.setState({dataType:e,data:t,yearFrom:a,yearTo:r})})},n.handleChange=function(e){var t=parseInt(e.target.value,10)||"";n.setState(Object(l.a)({},e.target.name,t))},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.yearFrom,r=t.yearTo,i=t.dataType;"Temperature"===i?y(a,r).then(function(e){n.setState({dataType:i,data:e})}):"Precipitation"===i&&g(a,r).then(function(e){n.setState({dataType:i,data:e})})},n.state={initializing:!0,dataType:"Temperature",yearFrom:1881,yearTo:2006},b.init().catch(function(e){throw e}).then(function(e){n.setState({data:e})}),n}return Object(d.a)(t,e),Object(h.a)(t,[{key:"validate",value:function(){var e=this.state,t=e.yearFrom,n=e.yearTo,a=t,r=n;return(t<1881||t>2006)&&(a=1881),(n>2006||n<1881)&&(r=2006),n<t&&(r=a),{yearFrom:a,yearTo:r}}},{key:"render",value:function(){var e=this,t=this.state,n=t.dataType,a=t.yearFrom,r=t.yearTo,o=t.data;return i.a.createElement(i.a.Fragment,null,i.a.createElement(P,null,i.a.createElement(H,null,i.a.createElement(C,{onClick:function(){return e.onClick("Temperature")},active:"Temperature"===n},"Temperature"),i.a.createElement(C,{onClick:function(){return e.onClick("Precipitation")},active:"Precipitation"===n},"Precipitation")),i.a.createElement(R,{onSubmit:this.handleSubmit,onChange:this.handleChange,yearFrom:a,yearTo:r})),i.a.createElement(w,{data:o,width:800,height:600}))}}]),t}(r.Component);function J(){var e=Object(a.a)(["\n  body {\n    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;\n    font-size: 16px;\n  }\n\n  .flex{\n      box-shadow: none!important;\n  }\n\n  #root{\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n  }\n"]);return J=function(){return e},e}var U=Object(u.a)(J());c.a.render(i.a.createElement(i.a.Fragment,null,i.a.createElement(q,null),i.a.createElement(U,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.52ec7d0f.chunk.js.map