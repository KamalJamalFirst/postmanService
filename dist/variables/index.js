"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = void 0;
const path_1 = require("path");
const countries = ('ad,ae,af,ag,ai,al,am,ao,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bl,bm,bn,bo,bq,br,bs,bt,bw,by,bz,ca,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cw,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gt,gu,gw,gy,hk,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mf,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,si,sk,sl,sm,sn,so,sr,ss,st,sv,sx,sy,sz,tc,td,tg,th,tj,tk,tl,tm,tn,to,tr,tt,tv,tw,tz,ua,ug,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,za,zm,zw').split(',');
const filePathToUsed = (0, path_1.resolve)(`./country/used.json`);
const fullFile = {};
const fullFileForUsed = {};
const sentIpsToPostman = new Set();
const sentPhonesToPostman = new Set();
exports.variables = {
    countries,
    filePathToUsed,
    fullFile,
    fullFileForUsed,
    sentIpsToPostman,
    sentPhonesToPostman
};
//# sourceMappingURL=index.js.map