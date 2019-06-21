import { Title } from './Title';
const title = new Title();
XA.component.title = title.mount;
XA.register('title', XA.component.title);
