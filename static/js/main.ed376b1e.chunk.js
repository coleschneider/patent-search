(this.webpackJsonppor=this.webpackJsonppor||[]).push([[0],{43:function(e,t,n){e.exports=n(71)},48:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(36),o=n.n(i),s=(n(48),n(18)),c=n(19),l=n(1),u=n(11),p=n(15);n(10);var d={mediaQuery:"only screen",columns:{xs:4,sm:8,md:8,lg:12,xl:12},gutterWidth:{xs:1,sm:1,md:1.5,lg:1.5,xl:1.5},paddingWidth:{xs:1,sm:1,md:1.5,lg:1.5,xl:1.5},container:{xs:"full",sm:"full",md:"full",lg:90,xl:90},breakpoints:{xs:1,sm:48,md:64,lg:90,xl:120}};function m(e){return function(){return Object(l.a)(["@media ","{","}"],e,l.a.apply(void 0,arguments))}}var g=Object.keys(d.breakpoints).reduce((function(e,t){var n=d.breakpoints[t];return e[t]=m([d.mediaQuery,n>=0&&"(min-width: ".concat(n,"rem)")].filter(Boolean).join(" and ")),e}),{});var f=n(2),_=n.n(f),y=n(6),b=n(7);var h=function(e,t){var n=t.validations,a=void 0===n?[]:n,i=r.a.useState(e),o=Object(b.a)(i,2),s=o[0],c=o[1],l=r.a.useState([]),u=Object(b.a)(l,2),p=u[0],d=u[1],m=r.a.useState(!1),g=Object(b.a)(m,2),f=g[0],h=g[1],v=r.a.useState(!1),x=Object(b.a)(v,2),E=x[0],w=x[1],C=r.a.useCallback((function(e){"checkbox"===e.target.type?c(e.target.checked):c(e.target.value)}),[]);r.a.useEffect((function(){(function(){var e=Object(y.a)(_.a.mark((function e(){var t;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),t=[],e.next=4,Promise.all(a.map(function(){var e=Object(y.a)(_.a.mark((function e(n){var a;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(s);case 2:(a=e.sent)&&t.push(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:d(t),w(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[s]);var k=0===p.length;return{value:s,setValue:c,errors:p,setErrors:d,clear:r.a.useCallback((function(){"string"===typeof e&&c("")}),[]),reset:r.a.useCallback((function(){return c(e)}),[]),onChange:C,touched:f,onBlur:r.a.useCallback((function(){h(!0)})),setTouched:h,isValid:k,isValidating:E}},v=n(13);var x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=r.a.useState({}),a=Object(b.a)(n,2),i=a[0],o=a[1],s=r.a.useState({}),c=Object(b.a)(s,2),l=c[0],u=c[1];r.a.useEffect((function(){var t={},n={};Object.entries(e).forEach((function(e){var a=Object(b.a)(e,2),r=a[0],i=a[1];t[r]=i.value,n[r]=i.errors})),Object(v.isEqual)(l,t)||u(t),Object(v.isEqual)(i,n)||o(n)}));var p=Object.values(e).some((function(e){return e.isValidating})),d=!p&&Object.values(e).every((function(e){return e.isValid}));return{submit:function(e){e.preventDefault(),t({values:l,errors:i})},values:l,errors:i,isValid:d,isValidating:p,reset:r.a.useCallback((function(){Object.values(e).forEach((function(e){return e.reset()}))})),clear:r.a.useCallback((function(){Object.values(e).forEach((function(e){return e.clear()}))}))}},E=function(e){if(e.length<4)return"Must be at least 4 characters"},w=function(e){if("tes"===e||"test"===e)return"Test values not allowed"};var C=function(e){var t=e.children,n=e.label,a=e.input;return r.a.createElement("div",null,r.a.createElement("div",null,n&&r.a.createElement("label",{htmlFor:""},n),t),a.touched&&a.errors&&a.errors.length>0&&r.a.createElement("div",null,"Error:"," ",a.errors.map((function(e,t){return r.a.createElement("li",{key:t},e)}))))};var k=function(e){var t=e.match.params,n=h("Cole",{validations:[E,w]}),r=h("Schneider",{validations:[E,w]}),i=h(t.company||"",{validations:[w]}),o=x({firstName:n,lastName:r,company:i},function(){var t=Object(y.a)(_.a.mark((function t(n){var a;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=n.values,n.errors,e.history.push("/".concat(a.company));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());return a.createElement(a.Fragment,null,a.createElement("form",null,a.createElement("h3",null,"Policy Patent Aggregator [BETA 1.0]"),a.createElement(C,{input:n,label:"First Name"},a.createElement("input",{type:"text",value:n.value,onChange:n.onChange,onBlur:n.onBlur})),a.createElement(C,{input:r,label:"Last Name"},a.createElement("input",{type:"text",value:r.value,onChange:r.onChange,onBlur:r.onBlur})),a.createElement(C,{input:i,label:"Company"},a.createElement("input",{type:"text",value:i.value,onChange:i.onChange,onBlur:i.onBlur})),a.createElement("button",{disabled:!o.isValid,onClick:o.submit,type:"submit"},o.isValid?"\u2705":"\u274c"," Submit")))},O=l.b.div.withConfig({displayName:"Patent__Wrapper",componentId:"sc-10jogzk-0"})(["display:flex;border-bottom-color:rgb(230,236,240);border-bottom-width:1px;pointer-events:auto;flex-direction:column;"]),j=l.b.div.withConfig({displayName:"Patent__Container",componentId:"sc-10jogzk-1"})(["transition-property:background;cursor:pointer;padding:1rem;transition-duration:0.2s;:hover{background-color:rgb(245,248,250);}"]);var P=function(e){var t=e.patent_title;return r.a.createElement(O,null,r.a.createElement(j,null,r.a.createElement("p",null,t)))},S=l.b.main.withConfig({displayName:"Spinner__Container",componentId:"sc-1ca0fxs-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:sans-serif;"]),B=Object(l.c)(["to{transform:rotate(360deg);}"]),N=l.b.div.withConfig({displayName:"Spinner__Circle",componentId:"sc-1ca0fxs-1"})(["border:3px solid orangered;border-radius:50%;border-right-color:transparent;display:inline-block;width:50px;height:50px;animation:1s linear infinite ",";"],B);var T=function(){return r.a.createElement(S,null,r.a.createElement(N,null))};var A=function(e){var t=ge(),n=(t.state,t.getPatentsByCompany),a=t.patentsByCompany,i=t.getPatentById,o=e.match.url.substring(1),s=e.match.params.company;r.a.useEffect((function(){(function(){var t=Object(y.a)(_.a.mark((function t(){return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(o,e.match.params.company,1);case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]);var c=a(o),l=c.ids.map((function(e){return i(e)})),u=c&&Math.ceil(c.total/25),p=!c||c.isFetching&&0===c.ids.length;return r.a.createElement("div",null,r.a.createElement("h1",null,p?"Fetching patent data for ".concat(s,"'s profile"):"Company - ".concat(s)),l?l.map((function(e){return r.a.createElement(P,Object.assign({key:e.patent_id},e))})):null,c.isFetching&&r.a.createElement(T,null),r.a.createElement("button",{onClick:function(){n(o,e.match.params.company,c.page+1)},disabled:!c||c.page===u},"Load More"))};var F={};var I=function(e,t){var n=a.createContext(F),r=function(r){var i=r.children,o=e(r),s=t?a.useMemo((function(){return o}),[o]):o;return a.createElement(n.Provider,{value:s},i)};e.name&&(n.displayName="".concat(e.name,".Context"),r.displayName="".concat(e.name,".Provider"));var i=function(){return a.useContext(n)};return i.Context=n,i.Provider=r,i},M=n(16),z=n(22),R=n.n(z),q=function(e,t){return R.a.get('https://cors-anywhere.herokuapp.com/http://webapi.patentsview.org/api/patents/query?q={"_and":[{"_or":[{"_and":[{"_contains":{"assignee_first_name":"'.concat(e,'"}}]},{"_and":[{"_contains":{"assignee_last_name":"').concat(e,'"}}]},{"_and":[{"_contains":{"assignee_organization":"').concat(e,'"}}]}]},{"uspc_sequence":0}]}&f=["patent_id","patent_title","uspc_sequence","uspc_mainclass_id","uspc_mainclass_title","cpc_group_id","cpc_group_title","nber_subcategory_id","nber_subcategory_title","patent_type","patent_num_cited_by_us_patents","app_date","patent_date","patent_number","inventor_id","inventor_first_name","inventor_last_name","inventor_country","inventor_state","inventor_city","inventor_location_id","assignee_id","assignee_first_name","assignee_last_name","assignee_organization","assignee_country","assignee_state","assignee_city","assignee_location_id","app_date","patent_date","govint_org_id","govint_org_name"]&o={"per_page":25,"matched_subentities_only":false,"page":').concat(t,'}&s=[{"patent_num_cited_by_us_patents":"desc"},{"patent_title":"asc"},{"patent_date":"desc"}]'))},V=function(e,t){return R.a.get('https://cors-anywhere.herokuapp.com/http://webapi.patentsview.org/api/assignees/query?q={"_and":[{"_or":[{"_and":[{"_contains":{"assignee_first_name":"'.concat(e,'"}}]},{"_and":[{"_contains":{"assignee_last_name":"').concat(e,'"}}]},{"_and":[{"_contains":{"assignee_organization":"').concat(e,'"}}]}]},{"uspc_sequence":0}]}&f=["assignee_id","assignee_first_name","assignee_last_name","assignee_organization","assignee_lastknown_country","assignee_lastknown_state","assignee_lastknown_city","assignee_lastknown_location_id","assignee_total_num_patents","assignee_first_seen_date","assignee_last_seen_date","patent_id"]&o={"per_page":25,"matched_subentities_only":true,"sort_by_subentity_counts":"patent_id","page":').concat(t,'}&s=[{"patent_id":"desc"},{"assignee_total_num_patents":"desc"},{"assignee_organization":"asc"},{"assignee_last_name":"asc"},{"assignee_first_name":"asc"}]'))};function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(n,!0).forEach((function(t){Object(p.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var L="FETCH_COMPANIES",D="FETCH_COMPANIES_COMPLETE",K="FETCH_COMPANIES_ERROR",U="FETCH_PATENTS",G="FETCH_PATENTS_COMPLETE",J="FETCH_PATENTS_ERROR",Q="SET_ERROR_MESSAGE",$=function(e){var t=e.types,n=e.mapActionToKey,a=Object(b.a)(t,3),r=a[0],i=a[1],o=a[2];return function(e,t){switch(t.type){case r:case i:case o:var a=n(t);if("string"!==typeof a)throw new Error("expecteed key to be a string");return H({},e,Object(p.a)({},a,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{ids:[],isFetching:!0,errors:null,page:1,count:0,total:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r:return H({},e,{page:t.meta.page,isFetching:!0});case i:return H({},e,{count:t.payload.count,total:t.payload.total,ids:v.union(e.ids,t.payload.ids),isFetching:!1});case o:return H({},e,{isFetching:!1});default:return e}}(e[a],t)));default:return e}}},X={companySearches:{},patentsByCompany:{},errorMessage:null,entities:{companies:{},patents:{}}},Y=new M.b.Entity("companies",{},{idAttribute:function(e){return e.assignee_id}}),Z=new M.b.Entity("patents",{},{idAttribute:function(e){return e.patent_id}}),ee=$({types:[L,D,K],mapActionToKey:function(e){return e.meta.search}}),te=$({types:[U,G,J],mapActionToKey:function(e){return e.meta.companyUrl}});var ne=function(){var e=function(e,t){return t.hasOwnProperty("payload")&&t.payload.entities?v.merge({},e,t.payload.entities):e},t=function(e,t){return"SET_ERROR_MESSAGE"===t.type?t.payload.message:e},n=r.a.useReducer((function(n,a){return{companySearches:ee(n.companySearches,a),patentsByCompany:te(n.patentsByCompany,a),entities:e(n.entities,a),errorMessage:t(n.errorMessage,a)}}),X),a=Object(b.a)(n,2),i=a[0],o=a[1],s=function(e,t){return o({type:L,meta:{page:t,search:e}})},c=function(e,t,n){o({type:D,payload:e,meta:{search:t,page:n}})},l=function(e){return o({type:K,errors:e})},u=function(e){return o({type:Q,payload:{message:e}})},p=function(e,t,n){return o({type:U,meta:{search:t,page:n,companyUrl:e}})},d=function(e,t,n,a){return o({type:G,payload:e,meta:{search:n,companyUrl:t,page:a}})},m=function(e){return o({type:J,error:e})};return{state:i,getCompaniesByName:function(){var e=Object(y.a)(_.a.mark((function e(t){var n,a,r,i,o,p,d=arguments;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:1,s(t,n),e.prev=2,e.next=5,V(t,n);case 5:a=e.sent,(r=a.data).assignees||u("Not Found"),i=Object(M.a)(r.assignees||[],[Y]),o=i.entities,p=i.result,c({ids:p,entities:o,count:r.count,total:r.total_assignee_count},t,n),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),l(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}(),profileByCompany:function(e){return i.companySearches[e]||{ids:[]}},getCompaniesById:function(e){return i.entities.companies[e]},getPatentsByCompany:function(){var e=Object(y.a)(_.a.mark((function e(t,n){var a,r,i,o,s,c,l=arguments;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.length>2&&void 0!==l[2]?l[2]:1,p(t,n,a),e.prev=2,e.next=5,q(n,a);case 5:r=e.sent,i=r.data,o=Object(M.a)(i.patents||[],[Z]),s=o.entities,c=o.result,d({ids:c,entities:s,count:i.count,total:i.total_patent_count},t,n,a),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),m(e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t,n){return e.apply(this,arguments)}}(),patentsByCompany:function(e){return i.patentsByCompany[e]||{ids:[]}},getPatentById:function(e){return i.entities.patents[e]}}},ae=l.b.div.withConfig({displayName:"Company__Wrapper",componentId:"vjk3q9-0"})(["display:flex;border-bottom-color:rgb(230,236,240);border-bottom-width:1px;pointer-events:auto;flex-direction:column;"]),re=l.b.div.withConfig({displayName:"Company__Container",componentId:"vjk3q9-1"})(["transition-property:background;cursor:pointer;padding:1rem;transition-duration:0.2s;:hover{background-color:rgb(245,248,250);}"]);var ie=function(e){var t=e.assignee_organization,n=e.history,r=e.match,i=t||r.params.company;return a.createElement(ae,{onClick:function(){n.push("/patents/".concat(i))}},a.createElement(re,null,t))};var oe=function(e){var t=e.match.params.company,n=ge(),r=n.getCompaniesByName,i=(n.state,n.profileByCompany),o=n.getCompaniesById;a.useEffect((function(){r(t,1)}),[t]);var s=i(t),c=s.ids.map((function(e){return o(e)})),l=s&&Math.ceil(s.total/25);return!s||s.isFetching&&0===s.ids.length?a.createElement("div",null,a.createElement(T,null),a.createElement("i",null,"Loading ",t,"'s profile...")):a.createElement(a.Fragment,null,c.map((function(t,n){return a.createElement(ie,Object.assign({},t,{key:n},s,e))})),s.isFetching&&a.createElement(T,null),a.createElement("button",{onClick:function(){r(t,s.page+1)},disabled:!s||s.page===l},"Load More"))};function se(){var e=Object(c.a)(["\n    display: block;\n  "]);return se=function(){return e},e}function ce(){var e=Object(c.a)(["\n  width: 1000px;\n    margin-left: auto;\n    margin-right: auto;\n  "]);return ce=function(){return e},e}var le=l.b.main.withConfig({displayName:"App__Main",componentId:"sc-1jx0rgy-0"})(["display:flex;align-items:stretch;box-sizing:border-box;flex-direction:column;flex-basis:0%;position:relative;flex-shrink:1;flex-grow:1;border-width:0px;border-style:solid;border-color:black;border-image:initial;margin:0px;padding:0px;"]),ue=l.b.div.withConfig({displayName:"App__Wrapper",componentId:"sc-1jx0rgy-1"})(["display:flex;align-items:stretch;box-sizing:border-box;flex-direction:column;flex-basis:0%;flex-shrink:0;position:relative;background-color:rgb(230,236,240);backface-visibility:hidden;flex-grow:1;border-width:0px;border-style:solid;border-color:black;border-image:initial;margin:0px;padding:0px;"]),pe=l.b.div.withConfig({displayName:"App__Container",componentId:"sc-1jx0rgy-2"})([""," align-items:stretch;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:row;flex-shrink:0;position:relative;z-index:0;min-height:100%;background-color:rgba(0,0,0,0);flex-grow:1;border-width:0px;border-style:solid;border-color:black;border-image:initial;margin:10px 0px 0px;padding:0px 10px;"],g.md(ce())),de=l.b.div.withConfig({displayName:"App__SecondaryColumn",componentId:"sc-1jx0rgy-3"})(["align-items:stretch;box-sizing:border-box;flex-direction:column;flex-basis:0%;flex-shrink:0;position:relative;backface-visibility:hidden;display:none;width:360px;border-width:0px;border-style:solid;border-color:black;border-image:initial;margin:0px 20px;padding:0px;",""],g.md(se())),me=l.b.div.withConfig({displayName:"App__PrimaryColumn",componentId:"sc-1jx0rgy-4"})(["z-index:1;width:100%;background-color:rgb(255,255,255);margin-left:auto;margin-right:auto;max-width:600px;min-height:100vh;"]),ge=I(ne);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(s.a,{basename:"/patent-search"},r.a.createElement((function(){return a.createElement(ge.Provider,null,a.createElement(le,null,a.createElement(ue,null,a.createElement(pe,null,a.createElement(me,null,a.createElement(u.a,{exact:!0,path:"/:company?",component:k}),a.createElement(u.a,{exact:!0,path:"/:company",component:oe}),a.createElement(u.a,{exact:!0,path:"/patents/:company",component:A})),a.createElement(de,null,a.createElement("h3",null,"Put something here to show on desktop vi"))))))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);