import{dD as X,cy as Y,dE as Z,r as a,dA as ee,dF as te,dG as ne,dH as H,cB as se,dI as U,dJ as oe,dK as ae,dL as re,dM as le,cu as k,j as g,cv as b,du as K,dN as $,ds as A,dt as ce,dO as ie,ct as I,dP as _,cL as de,dQ as ue,dR as fe,dS as he,dT as me}from"./index-Cw_JW-sQ.js";const pe=()=>{};function ge(e,n,{disabled:t,clickTrigger:s}={}){const o=n||pe;X(e,o,{disabled:t,clickTrigger:s});const l=Y(c=>{Z(c)&&o(c)});a.useEffect(()=>{if(t||e==null)return;const c=ee(te(e));let m=(c.defaultView||window).event;const d=ne(c,"keyup",f=>{if(f===m){m=void 0;return}l(f)});return()=>{d()}},[e,t,l])}const W=a.forwardRef((e,n)=>{const{flip:t,offset:s,placement:o,containerPadding:l,popperConfig:c={},transition:m,runTransition:d}=e,[f,R]=H(),[y,E]=H(),h=se(R,n),u=U(e.container),T=U(e.target),[r,p]=a.useState(!e.show),i=oe(T,f,ae({placement:o,enableEvents:!!e.show,containerPadding:l||5,flip:t,offset:s,arrowElement:y,popperConfig:c}));e.show&&r&&p(!1);const x=(...M)=>{p(!0),e.onExited&&e.onExited(...M)},O=e.show||!r;if(ge(f,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!O)return null;const{onExit:F,onExiting:C,onEnter:w,onEntering:j,onEntered:D}=e;let P=e.children(Object.assign({},i.attributes.popper,{style:i.styles.popper,ref:h}),{popper:i,placement:o,show:!!e.show,arrowProps:Object.assign({},i.attributes.arrow,{style:i.styles.arrow,ref:E})});return P=re(m,d,{in:!!e.show,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:P,onExit:F,onExiting:C,onExited:x,onEnter:w,onEntering:j,onEntered:D}),u?le.createPortal(P,u):null});W.displayName="Overlay";const z=a.forwardRef(({className:e,bsPrefix:n,as:t="div",...s},o)=>(n=k(n,"popover-header"),g.jsx(t,{ref:o,className:b(e,n),...s})));z.displayName="PopoverHeader";const B=a.forwardRef(({className:e,bsPrefix:n,as:t="div",...s},o)=>(n=k(n,"popover-body"),g.jsx(t,{ref:o,className:b(e,n),...s})));B.displayName="PopoverBody";function G(e,n){let t=e;return e==="left"?t=n?"end":"start":e==="right"&&(t=n?"start":"end"),t}function J(e="absolute"){return{position:e,top:"0",left:"0",opacity:"0",pointerEvents:"none"}}const ve=a.forwardRef(({bsPrefix:e,placement:n="right",className:t,style:s,children:o,body:l,arrowProps:c,hasDoneInitialMeasure:m,popper:d,show:f,...R},y)=>{const E=k(e,"popover"),h=K(),[u]=(n==null?void 0:n.split("-"))||[],T=G(u,h);let r=s;return f&&!m&&(r={...s,...J(d==null?void 0:d.strategy)}),g.jsxs("div",{ref:y,role:"tooltip",style:r,"x-placement":u,className:b(t,E,u&&`bs-popover-${T}`),...R,children:[g.jsx("div",{className:"popover-arrow",...c}),l?g.jsx(B,{children:o}):o]})}),Re=Object.assign(ve,{Header:z,Body:B,POPPER_OFFSET:[0,8]}),Q=a.forwardRef(({bsPrefix:e,placement:n="right",className:t,style:s,children:o,arrowProps:l,hasDoneInitialMeasure:c,popper:m,show:d,...f},R)=>{e=k(e,"tooltip");const y=K(),[E]=(n==null?void 0:n.split("-"))||[],h=G(E,y);let u=s;return d&&!c&&(u={...s,...J(m==null?void 0:m.strategy)}),g.jsxs("div",{ref:R,style:u,role:"tooltip","x-placement":E,className:b(t,e,`bs-tooltip-${h}`),...f,children:[g.jsx("div",{className:"tooltip-arrow",...l}),g.jsx("div",{className:`${e}-inner`,children:o})]})});Q.displayName="Tooltip";const ye=Object.assign(Q,{TOOLTIP_OFFSET:[0,6]});function Ee(e){const n=a.useRef(null),t=k(void 0,"popover"),s=k(void 0,"tooltip"),o=a.useMemo(()=>({name:"offset",options:{offset:()=>{if(e)return e;if(n.current){if($(n.current,t))return Re.POPPER_OFFSET;if($(n.current,s))return ye.TOOLTIP_OFFSET}return[0,0]}}}),[e,t,s]);return[n,[o]]}function Oe(e,n){const{ref:t}=e,{ref:s}=n;e.ref=t.__wrapped||(t.__wrapped=o=>t(_(o))),n.ref=s.__wrapped||(s.__wrapped=o=>s(_(o)))}const V=a.forwardRef(({children:e,transition:n=I,popperConfig:t={},rootClose:s=!1,placement:o="top",show:l=!1,...c},m)=>{const d=a.useRef({}),[f,R]=a.useState(null),[y,E]=Ee(c.offset),h=A(m,y),u=n===!0?I:n||void 0,T=ce(r=>{R(r),t==null||t.onFirstUpdate==null||t.onFirstUpdate(r)});return ie(()=>{f&&c.target&&(d.current.scheduleUpdate==null||d.current.scheduleUpdate())},[f,c.target]),a.useEffect(()=>{l||R(null)},[l]),g.jsx(W,{...c,ref:h,popperConfig:{...t,modifiers:E.concat(t.modifiers||[]),onFirstUpdate:T},transition:u,rootClose:s,placement:o,show:l,children:(r,{arrowProps:p,popper:i,show:x})=>{var O;Oe(r,p);const F=i==null?void 0:i.placement,C=Object.assign(d.current,{state:i==null?void 0:i.state,scheduleUpdate:i==null?void 0:i.update,placement:F,outOfBoundaries:(i==null||(O=i.state)==null||(O=O.modifiersData.hide)==null?void 0:O.isReferenceHidden)||!1,strategy:t.strategy}),w=!!f;return typeof e=="function"?e({...r,placement:F,show:x,...!n&&x&&{className:"show"},popper:C,arrowProps:p,hasDoneInitialMeasure:w}):a.cloneElement(e,{...r,placement:F,arrowProps:p,popper:C,hasDoneInitialMeasure:w,className:b(e.props.className,!n&&x&&"show"),style:{...e.props.style,...r.style}})}})});V.displayName="Overlay";function we(e){return e&&typeof e=="object"?e:{show:e,hide:e}}function L(e,n,t){const[s]=n,o=s.currentTarget,l=s.relatedTarget||s.nativeEvent[t];(!l||l!==o)&&!me(o,l)&&e(...n)}de.oneOf(["click","hover","focus"]);const xe=({trigger:e=["hover","focus"],overlay:n,children:t,popperConfig:s={},show:o,defaultShow:l=!1,onToggle:c,delay:m,placement:d,flip:f=d&&d.indexOf("auto")!==-1,...R})=>{const y=a.useRef(null),E=A(y,ue(t)),h=fe(),u=a.useRef(""),[T,r]=he(o,l,c),p=we(m),{onFocus:i,onBlur:x,onClick:O}=typeof t!="function"?a.Children.only(t).props:{},F=v=>{E(_(v))},C=a.useCallback(()=>{if(h.clear(),u.current="show",!p.show){r(!0);return}h.set(()=>{u.current==="show"&&r(!0)},p.show)},[p.show,r,h]),w=a.useCallback(()=>{if(h.clear(),u.current="hide",!p.hide){r(!1);return}h.set(()=>{u.current==="hide"&&r(!1)},p.hide)},[p.hide,r,h]),j=a.useCallback((...v)=>{C(),i==null||i(...v)},[C,i]),D=a.useCallback((...v)=>{w(),x==null||x(...v)},[w,x]),P=a.useCallback((...v)=>{r(!T),O==null||O(...v)},[O,r,T]),M=a.useCallback((...v)=>{L(C,v,"fromElement")},[C]),q=a.useCallback((...v)=>{L(w,v,"toElement")},[w]),S=e==null?[]:[].concat(e),N={ref:F};return S.indexOf("click")!==-1&&(N.onClick=P),S.indexOf("focus")!==-1&&(N.onFocus=j,N.onBlur=D),S.indexOf("hover")!==-1&&(N.onMouseOver=M,N.onMouseOut=q),g.jsxs(g.Fragment,{children:[typeof t=="function"?t(N):a.cloneElement(t,N),g.jsx(V,{...R,show:T,onHide:w,flip:f,placement:d,popperConfig:s,target:y.current,children:n})]})};export{xe as O,ye as T};
