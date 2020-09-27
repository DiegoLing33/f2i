export default function Compose(...f: Array<CallableFunction>) {
    return (data: any) => f.reduce((y, f) =>  f(y), data);
};