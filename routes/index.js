var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx')
var web3 = new Web3('wss://ropsten.infura.io/ws/v3/c33d4597d5424e898bb4b12ab6f9e9e8');
const secp256k1 = require("secp256k1");
const {randomBytes} = require('crypto');
const base58check = require('base58check');
var SHA256 = require("sha256")
var RIPEMD160 = require('ripemd160');

var abi = [{
    "inputs": [], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "anonymous": false, "inputs": [{
        "indexed": true, "internalType": "address", "name": "owner", "type": "address"
    }, {
        "indexed": true, "internalType": "address", "name": "spender", "type": "address"
    }, {
        "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"
    }], "name": "Approval", "type": "event"
}, {
    "anonymous": false, "inputs": [{
        "indexed": true, "internalType": "address", "name": "from", "type": "address"
    }, {
        "indexed": true, "internalType": "address", "name": "to", "type": "address"
    }, {
        "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"
    }], "name": "Transfer", "type": "event"
}, {
    "inputs": [{
        "internalType": "address", "name": "owner", "type": "address"
    }, {
        "internalType": "address", "name": "spender", "type": "address"
    }], "name": "allowance", "outputs": [{
        "internalType": "uint256", "name": "", "type": "uint256"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [{
        "internalType": "address", "name": "spender", "type": "address"
    }, {
        "internalType": "uint256", "name": "amount", "type": "uint256"
    }], "name": "approve", "outputs": [{
        "internalType": "bool", "name": "", "type": "bool"
    }], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "address", "name": "account", "type": "address"
    }], "name": "balanceOf", "outputs": [{
        "internalType": "uint256", "name": "", "type": "uint256"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [], "name": "decimals", "outputs": [{
        "internalType": "uint8", "name": "", "type": "uint8"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [{
        "internalType": "address", "name": "spender", "type": "address"
    }, {
        "internalType": "uint256", "name": "subtractedValue", "type": "uint256"
    }], "name": "decreaseAllowance", "outputs": [{
        "internalType": "bool", "name": "", "type": "bool"
    }], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "address", "name": "spender", "type": "address"
    }, {
        "internalType": "uint256", "name": "addedValue", "type": "uint256"
    }], "name": "increaseAllowance", "outputs": [{
        "internalType": "bool", "name": "", "type": "bool"
    }], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [], "name": "name", "outputs": [{
        "internalType": "string", "name": "", "type": "string"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [], "name": "symbol", "outputs": [{
        "internalType": "string", "name": "", "type": "string"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [], "name": "totalSupply", "outputs": [{
        "internalType": "uint256", "name": "", "type": "uint256"
    }], "stateMutability": "view", "type": "function", "constant": true
}, {
    "inputs": [{
        "internalType": "address", "name": "to", "type": "address"
    }, {
        "internalType": "uint256", "name": "amount", "type": "uint256"
    }], "name": "transfer", "outputs": [{
        "internalType": "bool", "name": "", "type": "bool"
    }], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "address", "name": "from", "type": "address"
    }, {
        "internalType": "address", "name": "to", "type": "address"
    }, {
        "internalType": "uint256", "name": "amount", "type": "uint256"
    }], "name": "transferFrom", "outputs": [{
        "internalType": "bool", "name": "", "type": "bool"
    }], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "address", "name": "_owner", "type": "address"
    }], "name": "getBalance", "outputs": [{
        "internalType": "uint256", "name": "balance", "type": "uint256"
    }], "stateMutability": "view", "type": "function", "constant": true
}];
var coinDemoContract = new web3.eth.Contract(abi, '0x4246FF2401fe316453039B3e9F89564c567bEF48');

// console.log(web3.eth.accounts.create());
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Web3Demo'});
});
// 获取余额
router.get('/getBalanceByAddress', function (req, res, next) {
    console.log(req.query.address);
    web3.eth.getBalance(req.query.address, (error, rs) => {
        console.log(rs);
        res.send(rs);
    });
});
// 获取nonse
router.get('/getNonceByAddress', function (req, res, next) {
    console.log(req.query.address);
    web3.eth.getTransactionCount(req.query.address, (error, rs) => {
        console.log(rs.toString());
        res.send(rs.toString());
    });
});
// 查询交易信息
router.get('/getTransaction', function (req, res, next) {
    console.log(req.query.txHash);
    web3.eth.getTransaction(req.query.txHash, (error, rs) => {
        console.log(rs);
        res.send(rs);
    });
});
// 查询代币余额
router.get('/getTokenBalance', function (req, res, next) {
    console.log(req.query.address);
    coinDemoContract.methods.balanceOf(req.query.address).call((error, rs) => {
        res.send(rs);
    });
});
// ropsten转账
router.get('/transfer', function (req, res, next) {
    web3.eth.getTransactionCount(req.query.from, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            var nonce = parseInt(result) + 1;
            var rawTransaction = {
                from: req.query.from,
                to: req.query.to,
                value: req.query.amount,
                gasPrice: 170872,
                gasLimit: 50000,
                nonce: nonce
            };
            var privKey = new Buffer.from(req.query.privateKey, 'hex');
            var tx = new Tx(rawTransaction);
            tx.sign(privKey);
            var serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send(result);
                }
            })
        }
    });
});

// 从公钥生成私钥和地址
router.get('/addressGenerate', function (req, res, next) {
    const msg = randomBytes(32)
// generate privKey
    let privKey = req.query.privateKey;
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey));
// get the public key in a compressed format
    const pubKeyBytes = secp256k1.publicKeyCreate(privKey, false);
    let pubKey = Buffer.from(pubKeyBytes.buffer).toString('hex');
    var address = base58check.encode(new RIPEMD160().update(SHA256(pubKeyBytes)).digest('hex'));
    res.send({address: address, pubKey: pubKey});
});

module.exports = router;