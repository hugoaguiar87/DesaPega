import { pagix } from 'pagix';

import { Button, Div } from './styled';

const Page = ({ idx, active, onChange }) => {
    const handleClick = () => onChange(idx)
    
    return (
        <Button
            onClick={handleClick}
            style= {{background: active ? "#6D2080" : "white", color: active ? "white" : "black"}}
        >
            {idx}
        </Button>
    )
}

export const Paginate = ({ records, limit, current, delta, fixed, onChange }) => {
    const { total, start, end, middle, prev, next, from, to } = pagix({
        records,
        limit,
        current,
        delta,
        fixed,
        onChange
    })

    return(
        <Div>
            {start && start[0] !== current && (<Button onClick= {() => onChange(current - 1)}> {`<`} </Button>)}

            {start.map((idx, k) => (
                <Page idx={idx} active= {current === idx} onChange= {onChange} key={k}/>
            ))}

            {prev && (<Button onClick= {() => onChange(prev)}> ... </Button>)}

            {middle.map((idx, k) => (
                <Page idx={idx} active= {current === idx} onChange= {onChange} key={k}/>
            ))}

            {next && (<Button onClick= {() => onChange(next)} > ... </Button>)}

            {end.map((idx, k) => (
                <Page idx={idx} active= {current === idx} onChange= {onChange} key={k}/>
            ))}

            {end && end.length !== 0 && end[0] !== current  && (<Button onClick= {() => onChange(current + 1)} > {`>`} </Button>)}
        </Div>
    )
}