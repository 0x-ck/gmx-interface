import { Contract, ContractRunner, ethers, InterfaceAbi } from "ethers";
import { DataStore__factory } from "typechain-types/factories/DataStore__factory";
import { ExchangeRouter__factory } from "typechain-types/factories/ExchangeRouter__factory";
import { Multicall__factory } from "typechain-types/factories/Multicall__factory";
import { ARBITRUM, ARBITRUM_GOERLI, AVALANCHE, AVALANCHE_FUJI, BSС_MAINNET, BSС_TESTNET } from "./chains";
import { GlvRouter__factory } from "typechain-types";

const { ZeroAddress } = ethers;

export const XGMT_EXCLUDED_ACCOUNTS = [
  "0x330eef6b9b1ea6edd620c825c9919dc8b611d5d5",
  "0xd9b1c23411adbb984b1c4be515fafc47a12898b2",
  "0xa633158288520807f91ccc98aa58e0ea43acb400",
  "0xffd0a93b4362052a336a7b22494f1b77018dd34b",
];

const CONTRACTS = {
  [BSС_MAINNET]: {
    // bsc mainnet
    Treasury: "0xa44E7252a0C137748F523F112644042E5987FfC7",
    BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    GMT: "0x99e92123eB77Bc8f999316f622e5222498438784",
    Vault: "0xc73A8DcAc88498FD4b4B1b2AaA37b0a2614Ff67B",
    Router: "0xD46B23D042E976F8666F554E928e0Dc7478a8E1f",
    Reader: "0x087A618fD25c92B61254DBe37b09E5E8065FeaE7",
    AmmFactory: "0xBCfCcbde45cE874adCB698cC183deBcF17952812",
    AmmFactoryV2: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    OrderBook: "0x1111111111111111111111111111111111111111",
    OrderBookReader: "0x1111111111111111111111111111111111111111",
    GmxMigrator: "0xDEF2af818514c1Ca1A9bBe2a4D45E28f260063f9",
    USDG: "0x85E76cbf4893c1fbcB34dCF1239A91CE2A4CF5a7",
    NATIVE_TOKEN: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    XGMT: "0xe304ff0983922787Fd84BC9170CD21bF78B16B10",
    GMT_USDG_PAIR: "0xa41e57459f09a126F358E118b693789d088eA8A0",
    XGMT_USDG_PAIR: "0x0b622208fc0691C2486A3AE6B7C875b4A174b317",
    GMT_USDG_FARM: "0x3E8B08876c791dC880ADC8f965A02e53Bb9C0422",
    XGMT_USDG_FARM: "0x68D7ee2A16AB7c0Ee1D670BECd144166d2Ae0759",
    USDG_YIELD_TRACKER: "0x0EF0Cf825B8e9F89A43FfD392664131cFB4cfA89",
    XGMT_YIELD_TRACKER: "0x82A012A9b3003b18B6bCd6052cbbef7Fa4892e80",
    GMT_USDG_FARM_TRACKER_XGMT: "0x08FAb024BEfcb6068847726b2eccEAd18b6c23Cd",
    GMT_USDG_FARM_TRACKER_NATIVE: "0xd8E26637B34B2487Cad1f91808878a391134C5c2",
    XGMT_USDG_FARM_TRACKER_XGMT: "0x026A02F7F26C1AFccb9Cba7C4df3Dc810F4e92e8",
    XGMT_USDG_FARM_TRACKER_NATIVE: "0x22458CEbD14a9679b2880147d08CA1ce5aa40E84",
    AUTO: "0xa184088a740c695E156F91f5cC086a06bb78b827",
    AUTO_USDG_PAIR: "0x0523FD5C53ea5419B4DAF656BC1b157dDFE3ce50",
    AUTO_USDG_FARM: "0xE6958298328D02051769282628a3b4178D0F3A47",
    AUTO_USDG_FARM_TRACKER_XGMT: "0x093b8be41c1A30704De84a9521632f9a139c08bd",
    AUTO_USDG_FARM_TRACKER_NATIVE: "0x23ed48E5dce3acC7704d0ce275B7b9a0e346b63A",
    GMT_GMX_IOU: "0x47052469970C2484729875CC9E2dd2683fcE71fb",
    XGMT_GMX_IOU: "0xeB3733DFe3b68C9d26898De2493A3Bb59FDb4A7B",
    GMT_USDG_GMX_IOU: "0x481312655F81b5e249780A6a49735335BF6Ca7f4",
    XGMT_USDG_GMX_IOU: "0x8095F1A92526C304623483018aA28cC6E62EB1e1",
  },
  [BSС_TESTNET]: {
    // bsc testnet
    Vault: "0x1B183979a5cd95FAF392c8002dbF0D5A1C687D9a",
    Router: "0x10800f683aa564534497a5b67F45bE3556a955AB",
    Reader: "0x98D4742F1B6a821bae672Cd8721283b91996E454",
    AmmFactory: "0x6725f303b657a9451d8ba641348b6761a6cc7a17",
    AmmFactoryV2: "0x1111111111111111111111111111111111111111",
    OrderBook: "0x9afD7B4f0b58d65F6b2978D3581383a06b2ac4e9",
    OrderBookReader: "0x0713562970D1A802Fa3FeB1D15F9809943982Ea9",
    GmxMigrator: "0xDEF2af818514c1Ca1A9bBe2a4D45E28f260063f9",
    USDG: "0x2D549bdBf810523fe9cd660cC35fE05f0FcAa028",
    GMT: "0xedba0360a44f885ed390fad01aa34d00d2532817",
    NATIVE_TOKEN: "0x612777Eea37a44F7a95E3B101C39e1E2695fa6C2",
    XGMT: "0x28cba798eca1a3128ffd1b734afb93870f22e613",
    GMT_USDG_PAIR: "0xe0b0a315746f51932de033ab27223d85114c6b85",
    XGMT_USDG_PAIR: "0x0108de1eea192ce8448080c3d90a1560cf643fa0",
    GMT_USDG_FARM: "0xbe3cB06CE03cA692b77902040479572Ba8D01b0B",
    XGMT_USDG_FARM: "0x138E92195D4B99CE3618092D3F9FA830d9A69B4b",
    USDG_YIELD_TRACKER: "0x62B49Bc3bF252a5DB26D88ccc7E61119e3179B4f",
    XGMT_YIELD_TRACKER: "0x5F235A582e0993eE9466FeEb8F7B4682993a57d0",
    GMT_USDG_FARM_TRACKER_XGMT: "0x4f8EE3aE1152422cbCaFACd4e3041ba2D859913C",
    GMT_USDG_FARM_TRACKER_NATIVE: "0xd691B26E544Fe370f39A776964c991363aF72e56",
    XGMT_USDG_FARM_TRACKER_XGMT: "0xfd5617CFB082Ba9bcD62d654603972AE312bC695",
    XGMT_USDG_FARM_TRACKER_NATIVE: "0x0354387DD85b7D8aaD1611B3D167A384d6AE0c28",
    GMT_GMX_IOU: "0x47052469970C2484729875CC9E2dd2683fcE71fb",
    XGMT_GMX_IOU: "0xeB3733DFe3b68C9d26898De2493A3Bb59FDb4A7B",
    GMT_USDG_GMX_IOU: "0x481312655F81b5e249780A6a49735335BF6Ca7f4",
    XGMT_USDG_GMX_IOU: "0x8095F1A92526C304623483018aA28cC6E62EB1e1",
  },
  [ARBITRUM_GOERLI]: {
    // arbitrum testnet
    Vault: ZeroAddress,
    Router: ZeroAddress,
    VaultReader: ZeroAddress,
    Reader: ZeroAddress,
    GlpManager: ZeroAddress,
    RewardRouter: ZeroAddress,
    RewardReader: ZeroAddress,
    GlpRewardRouter: ZeroAddress,
    NATIVE_TOKEN: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    GLP: ZeroAddress,
    GMX: ZeroAddress,
    ES_GMX: ZeroAddress,
    BN_GMX: ZeroAddress,
    USDG: ZeroAddress,
    ES_GMX_IOU: ZeroAddress,

    StakedGmxTracker: ZeroAddress,
    BonusGmxTracker: ZeroAddress,
    FeeGmxTracker: ZeroAddress,
    StakedGlpTracker: ZeroAddress,
    FeeGlpTracker: ZeroAddress,

    StakedGmxDistributor: ZeroAddress,
    StakedGlpDistributor: ZeroAddress,

    GmxVester: ZeroAddress,
    GlpVester: ZeroAddress,
    AffiliateVester: ZeroAddress,

    OrderBook: ZeroAddress,
    OrderExecutor: ZeroAddress,
    OrderBookReader: ZeroAddress,

    PositionRouter: ZeroAddress,
    PositionManager: ZeroAddress,

    TraderJoeGmxAvaxPool: ZeroAddress,
    ReferralStorage: "0x995E905E471D53B7c5d0dbf6406860Cb3C029e95",
    ReferralReader: ZeroAddress,

    // Synthetics
    DataStore: "0xbA2314b0f71ebC705aeEBeA672cc3bcEc510D03b",
    EventEmitter: "0x2fbE45fCb58B7106CF0a3Be9225D5Ed5A1004cc4",
    ExchangeRouter: "0xFE98518C9c8F1c5a216E999816c2dE3199f295D2",
    SubaccountRouter: "0x4Ae6ecDD55ee1066477Ee4B5Fc9f4D04C4CE66E9",
    DepositVault: "0x838a9bdf8736eD522A60F5f715e4F3FC2BC91A08",
    WithdrawalVault: "0xaAac001C2a2727Ff2d484C4Ad7d2079C7094e7Ef",
    OrderVault: "0x82aFd2590814a7Ce3d7ea6b63F80481F8b227bA9",
    SyntheticsReader: "0xab747a7bb64B74D78C6527C1F148808a19120475",
    SyntheticsRouter: "0xa960786Bc30F8587279df6116F9E0B15C5b034dE",
    Timelock: ZeroAddress,

    Multicall: "0x6d85594c9BD6b0833bC85AE62B360654A1e52D70",
  },
  [ARBITRUM]: {
    // arbitrum mainnet
    Vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
    Router: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
    VaultReader: "0xfebB9f4CAC4cD523598fE1C5771181440143F24A",
    Reader: "0x2b43c90D1B727cEe1Df34925bcd5Ace52Ec37694",
    GlpManager: "0x3963FfC9dff443c2A94f21b129D429891E32ec18",
    RewardRouter: "0x159854e14A862Df9E39E1D128b8e5F70B4A3cE9B",
    GlpRewardRouter: "0xB95DB5B167D75e6d04227CfFFA61069348d271F5",
    RewardReader: "0x8BFb8e82Ee4569aee78D03235ff465Bd436D40E0",
    GovToken: "0x2A29D3a792000750807cc401806d6fd539928481",
    NATIVE_TOKEN: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    GLP: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
    GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    ES_GMX: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
    BN_GMX: "0x35247165119B69A40edD5304969560D0ef486921",
    USDG: "0x45096e7aA921f27590f8F19e457794EB09678141",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954",
    StakedGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    BonusGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    FeeGmxTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
    StakedGlpTracker: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
    FeeGlpTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",

    StakedGmxDistributor: "0x23208B91A98c7C1CD9FE63085BFf68311494F193",
    StakedGlpDistributor: "0x60519b48ec4183a61ca2B8e37869E675FD203b34",

    GmxVester: "0x199070DDfd1CFb69173aa2F7e20906F26B363004",
    GlpVester: "0xA75287d2f8b217273E7FCD7E86eF07D33972042E",
    AffiliateVester: "0x7c100c0F55A15221A4c1C5a25Db8C98A81df49B2",

    OrderBook: "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB",
    OrderExecutor: "0x7257ac5D0a0aaC04AA7bA2AC0A6Eb742E332c3fB",
    OrderBookReader: "0xa27C20A7CF0e1C68C0460706bB674f98F362Bc21",

    PositionRouter: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
    PositionManager: "0x75E42e6f01baf1D6022bEa862A28774a9f8a4A0C",

    UniswapGmxEthPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E",
    ReferralStorage: "0xe6fab3f0c7199b0d34d7fbe83394fc0e0d06e99d",
    ReferralReader: "0x8Aa382760BCdCe8644C33e6C2D52f6304A76F5c8",
    Timelock: "0xaa50bD556CE0Fe61D4A57718BA43177a3aB6A597",

    // Synthetics
    DataStore: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
    EventEmitter: "0xC8ee91A54287DB53897056e12D9819156D3822Fb",
    SubaccountRouter: "0x9F48160eDc3Ad78F4cA0E3FDF54A75D8FB228452",
    ExchangeRouter: "0x69C527fC77291722b52649E45c838e41be8Bf5d5",
    DepositVault: "0xF89e77e8Dc11691C9e8757e84aaFbCD8A67d7A55",
    WithdrawalVault: "0x0628D46b5D145f183AdB6Ef1f2c97eD1C4701C55",
    OrderVault: "0x31eF83a530Fde1B38EE9A18093A333D8Bbbc40D5",
    ShiftVault: "0xfe99609C4AA83ff6816b64563Bdffd7fa68753Ab",
    SyntheticsReader: "0x23D4Da5C7C6902D4C86d551CaE60d5755820df9E",
    SyntheticsRouter: "0x7452c558d45f8afC8c83dAe62C3f8A5BE19c71f6",

    GlvReader: "0xd4f522c4339Ae0A90a156bd716715547e44Bed65",
    GlvRouter: "0x75eAFD2B4e306Dad8dd6334456F8018218Bc9882",
    GlvVault: "0x393053B58f9678C9c28c2cE941fF6cac49C3F8f9",

    Multicall: "0x842ec2c7d803033edf55e478f461fc547bc54eb2",
  },
  [AVALANCHE]: {
    // avalanche
    Vault: "0x9ab2De34A33fB459b538c43f251eB825645e8595",
    Router: "0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8",
    VaultReader: "0x66eC8fc33A26feAEAe156afA3Cb46923651F6f0D",
    Reader: "0x2eFEE1950ededC65De687b40Fd30a7B5f4544aBd",
    GlpManager: "0xD152c7F25db7F4B95b7658323c5F33d176818EE4",
    RewardRouter: "0xa192D0681E2b9484d1fA48083D36B8A2D0Da1809",
    GlpRewardRouter: "0xB70B91CE0771d3f4c81D87660f71Da31d48eB3B3",
    RewardReader: "0x04Fc11Bd28763872d143637a7c768bD96E44c1b6",
    GovToken: "0x0ff183E29f1924ad10475506D7722169010CecCb",
    NATIVE_TOKEN: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    GLP: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
    GMX: "0x62edc0692BD897D2295872a9FFCac5425011c661",
    ES_GMX: "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17",
    BN_GMX: "0x8087a341D32D445d9aC8aCc9c14F5781E04A26d2",
    USDG: "0xc0253c3cC6aa5Ab407b5795a04c28fB063273894",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

    StakedGmxTracker: "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342",
    BonusGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    FeeGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    StakedGlpTracker: "0x9e295B5B976a184B14aD8cd72413aD846C299660",
    FeeGlpTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",

    StakedGmxDistributor: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    StakedGlpDistributor: "0xDd593Cf40734199afc9207eBe9ffF23dA4Bf7720",

    GmxVester: "0x472361d3cA5F49c8E633FB50385BfaD1e018b445",
    GlpVester: "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A",
    AffiliateVester: "0x754eC029EF9926184b4CFDeA7756FbBAE7f326f7",

    OrderBook: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
    OrderExecutor: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
    OrderBookReader: "0xccFE3E576f8145403d3ce8f3c2f6519Dae40683B",

    PositionRouter: "0xffF6D276Bc37c61A23f06410Dce4A400f66420f8",
    PositionManager: "0xA21B83E579f4315951bA658654c371520BDcB866",

    TraderJoeGmxAvaxPool: "0x0c91a070f862666bbcce281346be45766d874d98",
    ReferralStorage: "0x827ed045002ecdabeb6e2b0d1604cf5fc3d322f8",
    ReferralReader: "0x505Ce16D3017be7D76a7C2631C0590E71A975083",
    Timelock: "0x8A68a039D555599Fd745f9343e8dE20C9eaFca75",

    // Synthetics
    DataStore: "0x2F0b22339414ADeD7D5F06f9D604c7fF5b2fe3f6",
    EventEmitter: "0xDb17B211c34240B014ab6d61d4A31FA0C0e20c26",
    SubaccountRouter: "0xe5485a4fD6527911e9b82A75A1bFEd6e47BE2241",
    ExchangeRouter: "0x3BE24AED1a4CcaDebF2956e02C27a00726D4327d",
    DepositVault: "0x90c670825d0C62ede1c5ee9571d6d9a17A722DFF",
    WithdrawalVault: "0xf5F30B10141E1F63FC11eD772931A8294a591996",
    OrderVault: "0xD3D60D22d415aD43b7e64b510D86A30f19B1B12C",
    ShiftVault: "0x7fC46CCb386e9bbBFB49A2639002734C3Ec52b39",
    SyntheticsReader: "0x95861eecD91Cb30220598DdA68268E7c1F1A1386",
    SyntheticsRouter: "0x820F5FfC5b525cD4d88Cd91aCf2c28F16530Cc68",

    GlvReader: "0xa87d176FEaC5F4f098FB490702105F938E97ddF3",
    GlvRouter: "0xEa90EC1228F7D1b3D47D84d1c9D46dBDFEfF7709",
    GlvVault: "0x527FB0bCfF63C47761039bB386cFE181A92a4701",

    Multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
  },

  [AVALANCHE_FUJI]: {
    Vault: ZeroAddress,
    Router: ZeroAddress,
    VaultReader: ZeroAddress,
    Reader: ZeroAddress,
    GlpManager: ZeroAddress,
    RewardRouter: ZeroAddress,
    RewardReader: ZeroAddress,
    GlpRewardRouter: ZeroAddress,
    NATIVE_TOKEN: "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3",
    GLP: ZeroAddress,
    GMX: ZeroAddress,
    ES_GMX: ZeroAddress,
    BN_GMX: ZeroAddress,
    USDG: ZeroAddress,
    ES_GMX_IOU: ZeroAddress,

    StakedGmxTracker: ZeroAddress,
    BonusGmxTracker: ZeroAddress,
    FeeGmxTracker: ZeroAddress,
    StakedGlpTracker: ZeroAddress,
    FeeGlpTracker: ZeroAddress,

    StakedGmxDistributor: ZeroAddress,
    StakedGlpDistributor: ZeroAddress,

    GmxVester: ZeroAddress,
    GlpVester: ZeroAddress,
    AffiliateVester: ZeroAddress,

    OrderBook: ZeroAddress,
    OrderExecutor: ZeroAddress,
    OrderBookReader: ZeroAddress,

    PositionRouter: ZeroAddress,
    PositionManager: ZeroAddress,

    TraderJoeGmxAvaxPool: ZeroAddress,
    ReferralStorage: "0x58726dB901C9DF3654F45a37DD307a0C44b6420e",
    ReferralReader: ZeroAddress,

    // Synthetics
    DataStore: "0xEA1BFb4Ea9A412dCCd63454AbC127431eBB0F0d4",
    EventEmitter: "0xc67D98AC5803aFD776958622CeEE332A0B2CabB9",
    ExchangeRouter: "0xc9c1f8aff1035236223005742A95782B06f39E65",
    SubaccountRouter: "0x3b9B4549d46288932A99c4449eF7ebaEf9A6B0a3",
    DepositVault: "0x2964d242233036C8BDC1ADC795bB4DeA6fb929f2",
    WithdrawalVault: "0x74d49B6A630Bf519bDb6E4efc4354C420418A6A2",
    OrderVault: "0x25D23e8E655727F2687CC808BB9589525A6F599B",
    ShiftVault: "0x257D0EA0B040E2Cd1D456fB4C66d7814102aD346",
    SyntheticsReader: "0x538cFa1D253863e7550E444a388B12F511Ac4f50",
    SyntheticsRouter: "0x5e7d61e4C52123ADF651961e4833aCc349b61491",
    Timelock: ZeroAddress,

    GlvReader: "0x8B44C7771CAa8AaA3Fe64C8BdAB29ee392122D13",
    GlvRouter: "0x3fC060Ae116264fFF7b997B783aD866cA34d1F60",
    GlvVault: "0x76f93b5240DF811a3fc32bEDd58daA5784e46C96",

    Multicall: "0x0f53e512b49202a37c81c6085417C9a9005F2196",
  },
};

export function getContract(chainId: number, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}

function makeGetContract<T extends { abi: InterfaceAbi; connect: (address: string) => unknown }>(
  name: string,
  factory: T
) {
  return (chainId: number, provider?: ContractRunner) =>
    new Contract(getContract(chainId, name), factory.abi, provider) as unknown as ReturnType<T["connect"]>;
}

export const getDataStoreContract = makeGetContract("DataStore", DataStore__factory);
export const getMulticallContract = makeGetContract("Multicall", Multicall__factory);
export const getExchangeRouterContract = makeGetContract("ExchangeRouter", ExchangeRouter__factory);
export const getGlvRouterContract = makeGetContract("GlvRouter", GlvRouter__factory);

export const getZeroAddressContract = (provider?: ContractRunner) => new Contract(ZeroAddress, [], provider);
