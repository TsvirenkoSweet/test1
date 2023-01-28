export function mockData() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve({
                data: [
                    {id: 1, value: 'one'},
                    {id: 2, value: 'two'},
                    {id: 3, value: 'three'}
                ],
                status: '200'
            });
        }, 1000);
    });
}