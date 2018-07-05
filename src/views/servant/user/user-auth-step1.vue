<template>
  <div style="min-height: 100vh;padding-bottom: 100px;box-sizing: border-box">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        手机认证
      </xx-step-items>
      <xx-step-items slot="items">
        实名认证
      </xx-step-items>
      <xx-step-items slot="items">
        执业认证
      </xx-step-items>
      <xx-step-items slot="items">
        开始服务
      </xx-step-items>
    </xx-step-bar>
    <div class="bind_mobile_container">
      <label class="bind_mobile_cells">
        <input class="input_control" v-model="mobile" type="text" placeholder="请输入手机号码">
      </label>
      <div class="bind_mobile_cells">
        <input class="input_control" v-model="code" type="text" placeholder="请输入手机验证码">
        <a @click="getCode" :class="['send_mobile_code_btn', disabled_code ? 'disabled_code_btn' : '']" href="javascript:void(0)">{{codeText}}</a>
      </div>
      <div class="">
        <label class="xx-checker">
          <span class="xx-checker__input">
            <input v-model="userAgreement" type="checkbox"
                    ref="checkBoxRef"
                  aria-hidden="true"
                  class="xx-checker__original">
            <span class="xx-checker__inner"></span>
          </span>
          我已阅读并同意<a @click="agreementDialogVisable = true" href="javascript:viod(0);">《服务者服务协议》</a>
        </label>
      </div>
    </div>
    <div class="btn_bar">
      <button class="btn" :class="[submitLocked?'disabled_btn':'']"  @click="submit">下一步</button>
    </div>

    <div v-transfer-dom>
      <alert v-model="showHintAlert" title="悉心服务" content="请先完善个人资料及资格认证，方可进入主界面"></alert>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="agreementDialogVisable" :hide-on-blur="true">
        <div class="agreement_container">
          <h1 class="agreement_title">医护服务者服务协议</h1>
          <p class="agreement_text">欢迎您与悉心云健康服务平台经营者（以下简称：平台经营者）签署《服务者服务协议》（以下简称：本协议），并使用悉心云健康服务平台（以下简称：平台）提供的各项服务！本协议的双方为悉心云健康服务平台经营者重庆齐悦安康医院股份有限公司与注册、使用平台的医护服务者用户。
          </p>
          <p class="agreement_text mt10px">
            【审慎阅读】您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。如您对协议有任何疑问，可向平台客服人员咨询。如您未满18周岁，或其他限制民事行为能力人，请在监护人的陪同下阅读本协议。
          </p>
          <p class="agreement_text mt10px">
            【签约动作】当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与平台达成一致，成为平台的医护服务者用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序或咨询客服人员。
          </p>
          <p class="agreement_text mt10px">
            【词汇定义】本文中所用词汇定义如下：
          </p>
          <p class="agreement_text">
            1、平台：指悉心健康科技有限责任公司提供的基于微信服务号使用的服务系统。
          </p>
          <p class="agreement_text mt10px">
            2、平台经营者：指负责本平台运营管理、提供本平台给用户使用、根据用户请求实际提供全面的诊疗及健康管理、家庭护理等医疗服务的重庆齐悦安康医院股份有限公司。
          </p>
          <p class="agreement_text mt10px">
            3、医护服务者用户：指阅读和签署本协议，经过本平台注册程序成为本平台各项服务的提供者的执业医护人员，及康复师、理疗师、营养师、心理咨询师等专业人员；或经本平台采取合理方式对其身份、资质、能力服务水平进行核实、培训后，通过本平台向患者用户提供相应服务的执业医生、护士及其他专业医疗保健工作人员。
          </p>
          <p class="agreement_text mt10px">
            4、患者用户：指阅读和签署本协议，经过本平台注册程序成为本平台各项医护服务的使用者。
          </p>
          <p class="agreement_text mt10px">
             5、平台管理规定：包括本协议在内，所有在平台已经发布及后续发布的全部规则、提示、声明文件、解读、公告等内容。
          </p>
          <p class="agreement_small_title mt10px">
            一、服务内容：
          </p>
          <p class="agreement_text mt10px">
            1.1本协议项下服务的具体内容由平台经营者提供，平台经营者保留随时变更、中断或终止部分或全部网络服务的权利
          </p>
          <p class="agreement_text mt10px">
            1.2平台仅作为您与患者用户交流互通的工具及医疗护理服务、产品、商品的展示及交易的平台。
          </p>
          <p class="agreement_text mt10px">
            1.3平台在提供服务时，会对部分收费服务给予明确的提示，如拒绝支付此类费用，平台有权拒绝提供相关网络服务。
          </p>
          <p class="agreement_small_title mt10px">
            二、注册及使用
          </p>
          <p class="agreement_text mt10px">
            2.1注册
          </p>
          <p class="agreement_text">
            您在进行注册时，应按照平台所显示的要求提供注册资料，并保证提供的资料真实、准确、完整且合法有效，如您提供的资料不真实、不准确、不完整、不合法，或用户账号名称、头像和简介等注册信息中出现违法或不良信息的，您个人承担因此引起的法律责任及后果，平台经营者保留终止您使用平台及进一步追究其法律责任的权利。
          </p>
          <p class="agreement_text mt10px">
            2.2使用
          </p>
          <p class="agreement_text">
            2.2.1您注册成功后，接受服务订单前，需要按平台相关提示进行资质审核、参加平台经营者组织的岗前培训，并与平台经营者签署兼职或合作协议。您点击同意本协议即视为向平台经营者发出兼职或合作合同要约，您通过资质审核并参加岗前培训后，即取得平台经营者认证，视为其与平台敬业者的兼职或合作合同已成立，双方可就具体事宜另行协商。如平台经营者要求书面签署相关文件，您应予以配合。
          </p>
          <p class="agreement_text">
            若您未取得上述认证，则不能接受服务订单、或利用平台以任何形式向患者用户提供服务，或任何旨在或意图向患者用户收取费用的服务。若您未取得认证而从事前述服务，平台经营者有权随时终止您的平台帐户，并追究其相关责任。
          </p>
          <p class="agreement_text">
            2.2.2您依照本协议2.2.1的约定取得平台的认证后，应当根据平台管理制度，预留包括但不限于本人的银行账户、可预约时间、个人服务定价等相关信息，如相关信息发生任何变化，应当24小时内联系平台客服人员或在平台上更新。
          </p>
          <p class="agreement_text">
            2.2.3您在平台注册的账号和密码由您自行保管，其可随时登陆个人账户，查询账户的订单状态。您的平台账户内显示的金额为已完成的服务订单的合计金额 。因代扣税款、奖励、客户反馈评价、促销活动等导致医护服务者实际收入与上述合计金额不一致的，您有权向客服人员了解相关情况。
          </p>
          <p class="agreement_small_title mt10px">
            三、产品与交易
          </p>
          <p class="agreement_text mt10px">
            3.1产品展示与变更
          </p>
          <p class="agreement_text">
            3.1.1您在平台上所提供的服务项目、活动介绍等有关信息由您自行维护，并对该信息承担全部责任。平台经营者根据平台管理制度，就有关信息提出修改、完善建议的，您应当依建议进行修改。对于明显违背法律、法规、医疗信息管理规定及社会伦理道德的发布信息，平台有权直接删除，并追究您的相关责任。
          </p>
          <p class="agreement_text">
            3.1.2平台其他用户信息、产品、服务等有关信息（数量、价格、种类等）随时可能更新，不做另行通知。平台发布的信息可能会有一定的滞后性或差错，对此情形请知悉并理解。
          </p>
          <p class="agreement_text mt10px">
            3.2交易
          </p>
          <p class="agreement_text">
             3.2.1您平台上发布的服务产品种类、人员和价格等信息仅仅是您向患者用户发出的要约邀请，患者用户选择服务项目后系统生成的订单信息是患者用户向您发出的合同要约；
          </p>
          <p class="agreement_text">
            3.2.2您收到患者用户的合同邀约后，点击确定“生成任务”即相关服务合同立即成立并生效。合同成立后您未提供、未及时提供或未按订单内容提供服务的，不能获得相关服务收入，且平台经营者有权要求您承担赔偿责任。您接受平台订单后，因特殊情况需变更或取消订单的，须根据平台管理规定的时限、方式提前通知下单的患者用户，否则不得主动变更或取消。一个月内三次取消已接受订单的，平台有权暂停您在平台的账户15天。
          </p>
          <p class="agreement_text mt10px">
            3.2.3服务合同成立后，请您按照平台相关规定向患者用户提供服务。
          </p>
          <p class="agreement_small_title mt10px">
            四、您的权利和义务
          </p>
          <p class="agreement_text mt10px">
            4.1您自主管理在平台的账号及密码，可随时登陆平台查询您的订单状态，并对您的账号在平台进行的所有活动承担法律责任。
          </p>
          <p class="agreement_text mt10px">
            4.2您应向平台提供真实、准确、完整且合法有效的注册资料，因您提供的资料不真实、不准确、不完整、不合法的，您需承担相应责任及后果；平台保留终止您使用平台及进一步追究有关责任的权利
          </p>
          <p class="agreement_text mt10px">
            4.3您有权根据平台规定发布、获取信息，进行医患互通交流等。
          </p>
          <p class="agreement_text mt10px">
            4.4您应当接受平台的监督，并积极参加平台组织的有关交流、培训及学术活动。
          </p>
          <p class="agreement_text mt10px">
            4.5您应按照平台规定向患者用户提供服务。
          </p>
          <p class="agreement_text mt10px">
            4.6您应当仔细阅读并遵守《医护上门服务规范》、《医护上门服务注意事项》中的相关内容。
          </p>
          <p class="agreement_text mt10px">
            4.7您应当遵守国家卫计委《互联网医疗卫生信息服务管理办法》等有关法规，在平台上仅提供医疗卫生信息建议，不得从事网上诊断和治疗活动。
          </p>
          <p class="agreement_text mt10px">
            4.8您应当按照国家有关法律规定，对在平台上获得的收入依法纳税。
          </p>
          <p class="agreement_text mt10px">
            4.9您在使用平台时应当遵守国家法律、法规、公共道德及平台管理规定。因违反上述约定发生的法律后果由您承担相应法律责任。
          </p>
          <p class="agreement_text mt10px">
            4.10您不得发布违法信息，不得恶意评价其他医护人员、产品服务及用户。
          </p>
          <p class="agreement_text mt10px">
            4.11您不得以任何形式转让或授权他人使用自己的平台账号，亦不得盗用他人账号，由以上行为造成的后果由您自行承担。
          </p>
          <p class="agreement_text mt10px">
            4.12您如发现其他用户有违法或违反平台规定的行为，可以向平台进行反映要求处理。
          </p>
          <p class="agreement_small_title mt10px">
            五、平台经营者的权利和义务
          </p>
          <p class="agreement_text mt10px">
            5.1平台经营者除提供必要的网络技术帮助外，对您与患者用户之间的交流进行协助，但平台经营者不对您及其他用户发布的信息的来源和正确性负责，不对医患交流的结果承担任何责任。
          </p>
          <p class="agreement_text mt10px">
            5.2如因系统维护或升级的需要而需暂停平台网络服务，平台经营者将尽可能提前向您告知。
          </p>
          <p class="agreement_text mt10px">
            5.3平台经营者有权依法组织品牌及产品服务的市场宣传，以提高市场知名度。涉及宣传您个人的专业特长和能力，提高您的知名度的，平台经营者有权要求您配合提供相关资料。
          </p>
          <p class="agreement_text mt10px">
            5.4若您在平台与其它用户产生纠纷，请求平台从中予以调处，经平台审核后，平台经营者有权向纠纷双方了解清况，并将所了解的清况互相通知对方；平台所作出的调处行为不具有法律效力，调处结果系由纠纷双方自愿作出，平台经营者仅协助提供信息的沟通，不对调处结果承担相应法律责任。
          </p>
          <p class="agreement_text mt10px">
            5.5平台有权对您在平台提供服务所得的收入按照法律规定的金额进行代扣代缴税费。
          </p>
          <p class="agreement_text mt10px">
            5.6如协议期间您丧失执业资格、被平台其他用户投诉并经查证属实、存在严重违反医疗职业道德的行为经查证属实、或因医疗服务站原因造成医疗事故的，平台经营者有权立即解除双方协议、合同，并要求您承担相应责任。
          </p>
          <p class="agreement_text mt10px">
            5.7若您将涉及医疗纠纷的问题或其它有责任争议的问题在平台发布，或在平台有不当行为的，平台有权随时删除相关信息并终止您使用平台账户。
          </p>
          <p class="agreement_text mt10px">
            5.8平台有权对您的注册数据及活动行为进行查阅，发现注册数据或活动行为中存在任何问题或怀疑，均有权向您发出询问及要求改正的通知或者直接作出删除等处理。
          </p>
          <p class="agreement_text mt10px">
            5.9如存在下列情况，平台经营者有权根据不同情况选择保留或删除相关信息或继续、停止对您提供服务，并追究相关法律责任：
          </p>
          <p class="agreement_text">
            (1)平台其他用户或其它第三方通知平台，认为您的具体行为、具体事项可能存在重大问题；
          </p>
          <p class="agreement_text">
            (2)其他用户或其它第三方向平台告知您在平台上有违法或不当行为的，经平台查证属实的。
          </p>
          <p class="agreement_text mt10px">
            5.10经国家生效法律文书或行政处罚决定确认您存在违法行为，或者平台有足够事实依据可以认定您存在违法国家法律法规或平台管理规定的行为的，平台有权以合理方式公布您的违法行为。
          </p>
          <p class="agreement_small_title mt10px">
            六、信息保密与使用
          </p>
          <p class="agreement_text mt10px">
             6.1适用范围
          </p>
          <p class="agreement_text">
            6.1.1您注册平台时，根据平台要求提供的个人信息；
          </p>
          <p class="agreement_text">
            6.1.2您使用平台服务、参加相关活动、访问网站网页（或移动客户端/微信公众号/微信小程序）时，网站自动接收并记录服务者浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录；
          </p>
          <p class="agreement_text">
            6.1.3平台通过合法途径从其他途径取得的您的个人资料。
          </p>
          <p class="agreement_text mt10px">
            6.2信息保密
          </p>
          <p class="agreement_text">
            6.2.1保护您隐私是平台的一项基本政策，平台不对外公开或向第三方提供您的注册资料及其在使用网络服务时存储的非公开内容，但下列情况除外：事先获得您的明确授权；根据有关的法律法规要求；按照相关政府主管部门的要求；为维护社会公众的利益；为维护平台的合法权益。
          </p>
          <p class="agreement_text">
            6.2.2平台可能会与第三方合作，为您提供相关的网络服务，确保该第三方同意承担与平台同等的保护您的隐私的责任后，平台有权将您的注册资料等提供给该第三方。
          </p>
          <p class="agreement_text mt10px">
            6.3信息使用：
          </p>
          <p class="agreement_text">
            6.3.1平台在不透露单独您个人隐私资料的前提下，有权对在平台注册的全部医护服务人员用户的数据库进行分析并对医护服务者用户数据库进行商业上的利用。
          </p>
          <p class="agreement_text">
            6.3.2您与患者用户之间的咨询问题内容在隐去姓名、单位、地址等信息后，平台有权在未征得您同意的情况下公开、编辑、出版、发行。
          </p>
          <p class="agreement_text">
            6.3.3为达到服务您的目的，平台可能通过使用您的个人信息，向患者用户提供服务，包括但不限于向患者用户发出活动和服务信息等。
          </p>
          <p class="agreement_small_title mt10px">
            七、特别约定
          </p>
          <p class="agreement_text mt10px">
            您一旦接受本协议，即表明您将在平台发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给平台所有，同意平台经营者有权就其他主体侵权而单独提起诉讼。
          </p>
          <p class="agreement_small_title mt10px">
            八、协议的变更及终止
          </p>
          <p class="agreement_text mt10px">
            8.1变更
          </p>
          <p class="agreement_text">
            8.1.1平台可根据国家法律法规变化及维护交易秩序、保护消费者权益等需要，随时修改本协议、拟定新的补充协议，变更后的协议及新拟定的补充协议（下称“变更事项”）将以协议11.1约定的方式通知您。
          </p>
          <p class="agreement_text">
            8.1.2如您不同意变更事项，您有权于变更事项确定的生效日前联系平台反馈意见。如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止使用平台服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用平台服务，则视为您同意已生效的变更事项。
          </p>
          <p class="agreement_text mt10px">
            8.2终止
          </p>
          <p class="agreement_text">
            8.2.1如发生下列任何一种情形，平台有权解除本协议：
          </p>
          <p class="agreement_text">
            （1）平台发现您向平台提供虚假个人资料的；
          </p>
          <p class="agreement_text">
            （2）您有盗用他人账户、发布违禁信息、骗取他人财物的行为的； 
          </p>
          <p class="agreement_text">
            （3）您已经丧失或被暂停执业资格的；
          </p>
          <p class="agreement_text">
            （4）您有传播虚假信息，歪曲事实行为并经平台查证属实的；
          </p>
          <p class="agreement_text">
            （5）您有违反国家有关法律法规或平台管理规定的行为，侵害他人合法权益的；
          </p>
          <p class="agreement_text">
            （6）您因不当行为被行政或司法机构拘留或起诉；
          </p>
          <p class="agreement_text">
            （7）您在平台账户使用期间从事不实交易，或与患者用户私下交易（包括以各种方式绕开本平台与用户直接进行交易，或向用户提供预约确认服务项目以外的任何服务等），经平台要求纠正而拒不纠正的；
          </p>
          <p class="agreement_text">
            （8）您自愿注销平台账户的；
          </p>
          <p class="agreement_text">
            （9） 其它平台认为需要终止服务的情况。
          </p>
          <p class="agreement_text mt10px">
            8.2.2在您的平台账户注销后，平台经营者仍有以下权利：
          </p>
          <p class="agreement_text">
            （1）有权保留您的注册数据及过往的行为记录；
          </p>
          <p class="agreement_text">
            （2）如注销前在平台上存在违法行为或违反条款的行为，平台经营者仍可行使本服务条款所规定的权利；
          </p>
          <p class="agreement_text">
            （3）平台经营者仍有权向您追索所欠服务费用或要求承担因违反本协议而应承担的赔偿责任。
          </p>
          <p class="agreement_small_title mt10px">
            九、违约责任：
          </p>
          <p class="agreement_text mt10px">
            9.1违约认定
          </p>
          <p class="agreement_text">
            9.1.1使用平台时违反有关法律法规规定的；
          </p>
          <p class="agreement_text">
            9.1.2违反本协议或本协议补充协议约定的。
          </p>
          <p class="agreement_text mt10px">
            9.2 违约处理措施
          </p>
          <p class="agreement_text">
            您在平台上发布的信息构成违约的，平台可根据相应规则立即对相应信息进行删除、屏蔽处理或暂停您使用平台账户。
          </p>
          <p class="agreement_text mt10px">
            9.3违约责任
          </p>
          <p class="agreement_text">
            9.3.1如您的行为使平台经营者遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿上述全部损失。
          </p>
          <p class="agreement_text">
            9.3.2如您的行为使平台经营者遭受第三人主张权利， 平台经营者可在对第三人承担金钱给付等义务后就全部损失向您追偿。
          </p>
          <p class="agreement_text">
            9.3.3如因您的行为使得第三人遭受损失您应当自行承担赔偿责任。
          </p>
          <p class="agreement_small_title mt10px">
            十、免责声明：
          </p>
          <p class="agreement_text mt10px">
             10.1您使用平台所存在的风险将完全由您自己承担；因使用平台服务而产生的一切后果也由您自己承担，平台不承担任何责任。
          </p>
          <p class="agreement_text mt10px">
            10.2平台不担保网络服务一定能满足您的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。
          </p>
          <p class="agreement_text mt10px">
            10.3平台不保证为向您提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由平台实际控制的任何网页上的内容，平台均不承担任何责任。
          </p>
          <p class="agreement_text mt10px">
            10.4对于因不可抗力或平台不能控制的原因造成的网络服务中断或其它缺陷，平台不承担任何责任。
          </p>
          <p class="agreement_small_title mt10px">
             十一、通知送达：
          </p>
          <p class="agreement_text mt10px">
            11.1本协议项下平台的所有的通知均可通过在平台网页公告、页面提示、站内信、电子邮件、手机短信或常规的信件传送等方式通知您；该等通知于发送之日视为已送达至您。
          </p>
          <p class="agreement_text mt10px">
            11.2您向平台发出的通知应当通过平台对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。
          </p>
          <p class="agreement_small_title mt10px">
            十二、法律管辖及争议解决：
          </p>
          <p class="agreement_text mt10px">
            12.1本服务条款的订立、执行和解释及争议的解决均应适用中国法律。
          </p>
          <p class="agreement_text mt10px">
            12.2如本服务条款内容或其执行发生任何争议，平台将尽可能与您友好协商解决；协商不成时，任何一方均可向平台经营者所在地的人民法院提起诉讼。
          </p>
          <div style="margin-top:40px">
            <a style="border: 1px solid #3ac7f5;padding: 15px 40px;color:#3ac7f5" href="javascript:void(0)" @click="agreementDialogVisable = false">我已阅读完毕</a>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import {mapActions} from 'vuex'
import {Alert, XDialog, TransferDomDirective as TransferDom} from 'vux'
import { clearInterval, setInterval } from 'timers'
export default {
  directives: {
    TransferDom
  },
  components: {
    stepBar,
    Alert,
    XDialog
  },
  data () {
    return {
      agreementDialogVisable: false,
      showHintAlert: true,
      mobile: '',
      code: '',
      userAgreement: false,
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60,
      countDownTime: 60,
      getCodeIntervalTimer: null,
      codeText: '获取验证码',
      submitLocked: false
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    async updateUserAccountAndUserInfo () {
      await this.getUserAccount()
      await this.getUserInfo()
      return true
    },
    /**
     * 获取验证码
     */
    async getCode () {
      if (!this.disabled_code) {
        const mobile = this.mobile
        if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
          return this.$vux.toast.text('请填写正确的手机号')
        }
        let sendTime = sessionStorage.getItem(`${this.mobile}GetMobileCode`)
        if (sendTime) {
          let remainingTime = (new Date().getTime() - sendTime) / 1000
          if (remainingTime < 60) {
            this.$vux.toast.text('重发时间未到')
            this.countDownTime = Math.ceil(60 - remainingTime)
            this.setTimeIntervalTimer()
            return false
          }
        }
        this.disabled_code = true
        this.codeText = '发送中'
        await this.sendMobileCode().then(value => {
          if (value.Code === 100000) {
            sessionStorage.setItem(`${this.mobile}GetMobileCode`, new Date().getTime())
            this.setTimeIntervalTimer()
          } else {
            this.disabled_code = false
            this.codeText = '重新发送'
            this.$vux.toast.text('验证码发送失败')
          }
        })
      }
    },
    /**
     * 设置定时器
     */
    setTimeIntervalTimer () {
      this.disabled_code = true
      this.getCodeIntervalTimer = setInterval(() => {
        if (this.countDownTime > 0) {
          this.countDownTime -= 1
          this.codeText = `${this.countDownTime}s`
        } else {
          this.codeText = '重新发送'
          this.disabled_code = false
          clearInterval(this.getCodeIntervalTimer)
        }
      }, 1000)
    },
    /**
     * 发送验证码
     */
    async sendMobileCode () {
      const res = await this.$http.get('/ValidateCode', { mobile: this.mobile })
      return res.data
    },
    async submit () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      if (!(this.mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      if (!this.code) {
        return this.$vux.toast.text('请填写验证码')
      }
      if (!this.userAgreement) {
        return this.$vux.toast.text('请仔细阅读《用户注册协议》并勾选后，才可点击下一步')
      }
      this.submitLocked = true
      const res = await this.$http.put(`/ValidateMobile?mobile=${this.mobile}&validateCode=${this.code}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '绑定成功',
          onHide () {
            that.updateUserAccountAndUserInfo().then(() => {
              that.$router.push('/user/authstep2')
            })
          }
        })
      } else {
        this.submitLocked = false
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  margin-top: 10px;
  background: #fff;
}

.cell {
  padding: 15px 15px 0;
  display: flex;
  color: #666;
  input {
    flex: 1;
    padding: 13px;
    font-size: 15px;
  }
  .auth-code {
    border: 0;
    background: transparent;
    color: #3AC7F5;
    font-size: 16px;
  }
  &.vux-1px-b:after {
    left: 15px;
    right: 15px;
    border-color: #ccc;
    opacity: .5;
  }
  ::-webkit-input-placeholder {
    color: #ccc
  }
}

.xx-readme {
  label {
    display: flex;
    padding: 7px 28px;
    font-size: 13px;
    color: #666;
    align-items: center;
  }
  input {
    position: relative;
    margin-right: 4px;
    top: -2px;
    width: 14px;
    height: 14px;
  }
  a {
    color: #3BC8F6
  }
}

.step-btn {
  position: fixed;
  bottom: 23px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  .weui-btn {
    padding: 0;
    background: #3BC8F6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }
}
///
.bind_mobile_container
{
  background-color: #fff;
  margin: 20px 10px;
  padding: 20px;
  border-radius: 5px;
}
.bind_mobile_cells
{
  display: block;
  position: relative;
  height: 40px;
  margin-bottom: 20px;
  &::after
  {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: 1px;
    content: '';
    background-color: rgba(204, 204, 204, .3)
  }
  .input_control
  {
    height: 40px;
    font-size: 14px;
  }
  .send_mobile_code_btn
  {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    height: 40px;
    font-size: 12px;
    color: rgb(58, 199, 245);
    line-height: 40px;
    padding: 0 5px;
  }
  .disabled_code_btn
  {
    color: #999;
  }
}
.btn_bar
{
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  height: 45px;
  display: flex;
  flex-flow: nowrap;
  .btn
  {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    border-radius: 5px;
    background-color: #3AC7F5;
    color: #fff;
  }
  .disabled_btn
  {
    background-color: #ccc
  }
}

  .xx-checker {
    padding-left: 25px;
    min-height: 20px;
    line-height: 20px;
    color: #999999;
    font-weight: 400;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    a
    {
      color:#3AC7F5;
    }
  }
  .xx-checker__input {
    position: absolute;
    left: 0;
    top: 0;
    height: 20px;
    width: 20px;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .xx-checker__inner
  {
    border: 1px solid #999999;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
  }
  .xx-checker__inner::after {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
  }
  .xx-checker__original
  {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }
  .xx-checker__original:checked + .xx-checker__inner {
    border-color: #3AC7F5;
  }
  .xx-checker__original:checked + .xx-checker__inner::after {
    background-color: #3AC7F5;
    transform: translate(-50%,-50%) scale(1);
  }
  // 协议
  .agreement_container
  {
    padding: 20px 20px 60px 20px;
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
  }
  .agreement_title
  {
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 10px;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee
  }
  .agreement_text
  {
    text-align: justify;
    text-indent: 28px;
    font-size: 14px;
    color: #999;
  }
  .agreement_small_title
  {
    font-size: 14px;
    text-align: justify;
    color: #666;
  }
  .pl28px
  {
    padding-left: 28px;
  }
</style>
