import { check, group } from 'k6';
import http from 'k6/http';

export default function(){

    group('Homepage', function(){

    let homepageRes=http.get('http://www.jacplus.com.au');
    check(homepageRes,{
        'status is 200': r => r.status === 200,
        'Verify the home page': r => r.body.includes('JandaPLUS'),
        'transaction time is less than 500ms': r => r.timings.duration < 100
    });
    });
}