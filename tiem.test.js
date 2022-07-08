#! /usr/bin/env node

let timeCheck = require('./time')

describe(
    "Проверяем время.", () =>{
        const testCases = [
            {
                in:10920,
                expected:true
            },
            {
                in:3200,
                expected:true
            },
           
            {
                in:12000,
                expected:true
            },
            {
                in:35621,
                expected:true
            },
            {
                in:1500,
                expected:true
            },
            {
                in:32123,
                expected:true
            },
            {
                in:540,
                expected:true
            },
            {
                in:35554,
                expected:true
            },
            {
                in:7000,
                expected:true
            },
            {
                in:9999898,
                expected:true
            },
            {
                in:2222200,
                expected:true
            },{
                in:766556645,
                expected:true
            },
            {
                in:23123123,
                expected:true
            },
            {
                in:7675633,
                expected:true
            },{
                in:247,
                expected:true
            },{
                in:60,
                expected:true
            },{
                in:125,
                expected:true
            },{
                in:400,
                expected:true
            },
    
            
        ];
        testCases.forEach(test =>{
            it(
                `Input: ${test.in}||Output: ${test.expected}`,
                () =>{
                    let res = timeCheck(test.in)[0]
                    
                    expect(res).toBe(test.expected)
                }
            )
        }

        )
    }
)
