(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),c=t.n(u),o=t(12),i=t(2),l=t(3),m=t.n(l),s="/api/persons",d=function(e,n){return console.log("Update pyynt\xf6 l\xe4htee osoitteeseen: ","".concat(s,"/").concat(e)),m.a.put("".concat(s,"/").concat(e),n).then(function(e){return e.data})},f=function(e){return m.a.post(s,e).then(function(e){return e.data})},g=function(e){return m.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},h=function(e){var n=e.person,t=e.group,u=e.setGroup,c=e.messager,o=Object(a.useState)(n),l=Object(i.a)(o,1)[0];return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{type:"button",onClick:function(){var e="Poistetaanko ".concat(l.name,"?");window.confirm(e)&&(function(e,n,t){g(l.id).then(t(n.filter(function(n){return n.id!==e.id})))}(l,t,u),c("Henkil\xf6 ".concat(l.name," poistettu onnistuneesti")))}},"poista"))},b=function(e){var n=e.persons,t=e.setPersons,a=e.messager;return r.a.createElement("div",null,r.a.createElement("p",null,n.map(function(e){return r.a.createElement(h,{key:e.name,person:e,group:n,setGroup:t,messager:a})})),r.a.createElement("p",null,"T\xe4\xe4ll\xe4 tapahtuu kummallisuuksia"))},p=function(e){var n=e.newName,t=e.handleNameChange;return r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:n,onChange:t}))},v=function(e){var n=e.newNumber,t=e.handleNumberChange;return r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.addContact,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement(p,{newName:t,handleNameChange:a}),r.a.createElement(v,{newNumber:u,handleNumberChange:c}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},j=function(e){var n=e.targetName,t=e.handleTargetChange;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))},N=function(e){var n=e.message;if(n)return r.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n);return r.a.createElement("div",null)},w=function(e){var n=e.message;if(n)return r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n);return r.a.createElement("div",null)},C=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1];Object(a.useEffect)(function(){m.a.get("/api/persons").then(function(e){u(e.data)})},[]);var c=Object(a.useState)(""),l=Object(i.a)(c,2),s=l[0],g=l[1],h=Object(a.useState)(""),p=Object(i.a)(h,2),v=p[0],C=p[1],O=Object(a.useState)(""),k=Object(i.a)(O,2),y=k[0],S=k[1],T=Object(a.useState)(""),H=Object(i.a)(T,2),P=H[0],B=H[1],z=Object(a.useState)(""),G=Object(i.a)(z,2),J=G[0],R=G[1],x=function(e){R("".concat(e)),setTimeout(function(){R("")},3e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(N,{message:J}),r.a.createElement(w,{message:P}),r.a.createElement(j,{targetName:y,handleTargetChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"lis\xe4\xe4 uusi"),r.a.createElement(E,{addContact:function(e){if(e.preventDefault(),t.map(function(e){return e.name}).includes(s)){var n="".concat(s," on jo luettelossa, korvataanko vanha numero uudella?"),a=window.confirm(n),r=t.filter(function(e){return e.name===s})[0];if(a){var c=Object(o.a)({},r,{number:v});d(c.id,c).then(function(e){u(t.map(function(n){return n.id===r.id?e:n})),x("Henkil\xf6 ".concat(r.name," p\xe4ivitetty onnistuneesti"))}).catch(function(e){var n;n="Henkil\xf6 ".concat(r.name," oli jo poistettu"),B("".concat(n)),setTimeout(function(){R("")},3e3)})}}else f({name:s,number:v}).then(function(e){return u(t.concat(e))}),x("Henkil\xf6 ".concat(s," lis\xe4tty onnistunesti")),g(""),C("")},newName:s,handleNameChange:function(e){g(e.target.value)},newNumber:v,handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(b,{persons:function(e){return e?t.filter(function(n){return n.name.includes(e)}):t}(y),setPersons:u,messager:x}))};c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.4c11ea5d.chunk.js.map