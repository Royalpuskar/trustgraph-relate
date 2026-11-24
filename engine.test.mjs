import test from 'node:test';
import assert from 'node:assert/strict';
import {impact} from './engine.mjs';
test('transitive dependency impact',()=>assert.deepEqual(impact([['app','lib'],['web','app']],'lib'),[{id:'app',path:['lib','app']},{id:'web',path:['lib','app','web']}]));
test('cycles terminate',()=>assert.equal(impact([['a','b'],['b','a']],'a').length,1));
test('isolated component',()=>assert.deepEqual(impact([],'x'),[]));
test('invalid graph rejected',()=>assert.throws(()=>impact([['a',null]],'a')));
