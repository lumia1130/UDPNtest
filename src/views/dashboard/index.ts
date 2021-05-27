import { Component, Vue } from 'vue-property-decorator'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { getLists } from './index/api'
@Component({
  name: 'Dashboard',
  components: {}
})
export class Index extends Vue {
  private expands:string[] = [];
  private loading = false;
  private currentPage2 = 1;
  private dialogVisible = false;
  private tableData: Array<any> = [];
  private formData: any = {
    field101: undefined,
    field102: 'ia04qUNX5bPYOHIm8EVJ6pCSwM3tGZvF',
    field104: 1,
    field105: 1,
    field106: undefined,
    field107: undefined,
    field108: undefined
  };

  private formDataSearch: any = {
    field101: undefined,
    field102: undefined,
    field104: undefined,
    field105: undefined,
    field106: undefined,
    field107: undefined,
    field108: undefined,
    fieldStatus: undefined
  };

  private add() {
    this.dialogVisible = !this.dialogVisible
  }

  private rules: any = {
    field101: [
      {
        required: true,
        message: '请输入单行文本节点名称',
        trigger: 'blur'
      }
    ],
    // field102: [
    //   {
    //     required: true,
    //     message: '请输入节点编号',
    //     trigger: 'blur'
    //   }
    // ],
    field104: [
      {
        required: true,
        message: '节点类型不能为空',
        trigger: 'change'
      }
    ],
    field105: [{
      required: true,
      message: '请选择币种',
      trigger: 'change'
    }],
    field106: [
      {
        required: true,
        message: '请输入费率',
        trigger: 'blur'
      }
    ],
    field107: [
      {
        required: true,
        message: '请输入资金池地址',
        trigger: 'blur'
      }
    ],
    field108: [
      {
        required: true,
        message: '请输入简介',
        trigger: 'blur'
      }
    ]
  };

  private fieldStatus:any =[{
    label: '初始化',
    value: '初始化'
  }, {
    label: '已提交',
    value: '已提交'
  }, {
    label: '已入网',
    value: '已入网'
  }, {
    label: '退网中',
    value: '退网中'
  }, {
    label: '已退网',
    value: '已退网'
  }];

  private field105Options:any =[{
    label: 'USDT',
    value: 'USDT'
  }, {
    label: 'USDC',
    value: 'USDC'
  }];

    private field106Options:any= [{
      label: '0.01%',
      value: '0.01%'
    }, {
      label: '0.05%',
      value: '0.05%'
    }];

  private field104Options: any = [
    {
      label: 'BN',
      value: 'BN'
    },
    {
      label: 'TN',
      value: 'TN'
    }
  ];

   private field107Options:any= [{
     label: '0x_yHPCKLQ6ZNcqM5YheDV31WG8fk7OAubv',
     value: '0x_yHPCKLQ6ZNcqM5YheDV31WG8fk7OAubv'
   }, {
     label: '0x_1KSxf4YPdZsVOBvkwGnLcip9U3CQ0Iba',
     value: '0x_1KSxf4YPdZsVOBvkwGnLcip9U3CQ0Iba'
   }];

   private handleSizeChange(val:any) {
     console.log(`每页 ${val} 条`)
   }

   private handleCurrentChange(val:any) {
     console.log(`当前页: ${val}`)
   }

   private close() {
     (this as any).$refs.elForm.resetFields()
   }

   private onClose() {
     (this as any).$refs.elForm.resetFields()
   }

   private handelConfirm() {
     (this as any).$refs.elForm.validate((valid: any) => {
       if (valid) {
         const data = JSON.stringify({
           content: JSON.stringify(this.formData),
           pubUser: 'admin',
           pubTimestamp: 1435541999
         })

         const config:AxiosRequestConfig = {
           method: 'post',
           url: 'https://9lnkjrds.lc-cn-n1-shared.com/1.1/classes/Post',
           headers: {
             'X-LC-Id': '9lNkjrdSQ2hfbG1MAHEfK7iM-gzGzoHsz',
             'X-LC-Key': 'IfOiKKfbaMLp0mdR7zufidvv',
             'Content-Type': 'application/json'
           },
           data: data
         }
         const res = axios(config)
         res.then(re => {
           if (re.status === 201) {
             this.$message({
               message: '恭喜你，添加成功',
               type: 'success',
               duration: 2000,
               onClose: () => {
                 this.getList()
                 this.add()
                 this.onClose()
               }
             })
           }
         })
       } else {
         console.log('error submit!!')
         return false
       }
     })
   }

   created() {
     this.getsf()
   }

   private async getsf() {
     const resf = await getLists()
     console.log(resf)
   }

   private getList() {
     this.loading = true
     const data = qs.stringify({
       limit: '1000'
     })
     const config:AxiosRequestConfig = {
       method: 'get',
       url:
        'https://9lnkjrds.lc-cn-n1-shared.com/1.1/scan/classes/Post?limit=1000',
       headers: {
         'X-LC-Id': '9lNkjrdSQ2hfbG1MAHEfK7iM-gzGzoHsz',
         'X-LC-Key': 'P2BzXqOOKtFQXUleOfXKlgLI,master',
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: data
     }
     const re = axios(config)
     re.then(res => {
       if (res.status === 200) {
         this.loading = false
         this.tableData = []
         for (let i = 0; i < res.data.results.length; i++) {
           const content = JSON.parse(res.data.results[i].content)
           content.objectId = res.data.results[i].objectId
           this.tableData.unshift(content)
         }
       }
     })
   }

   private onDel(id: string) {
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       const config:AxiosRequestConfig = {
         method: 'delete',
         url: 'https://9lnkjrds.lc-cn-n1-shared.com/1.1/classes/Post/' + id,
         headers: {
           'X-LC-Id': '9lNkjrdSQ2hfbG1MAHEfK7iM-gzGzoHsz',
           'X-LC-Key': 'IfOiKKfbaMLp0mdR7zufidvv'
         }
       }

       const res = axios(config)
       res.then(re => {
         if (re.status === 200) {
           this.$message({
             message: '删除成功',
             type: 'success',
             duration: 2000,
             onClose: () => {
               this.getList()
               this.onClose()
             }
           })
         }
       })
     })
   }

   private getRowKeys(row:any) {
     return row.objectId
   }

   private expandSelect(row:any, expandedRows:any) {
     console.log(row)
     // eslint-disable-next-line @typescript-eslint/no-this-alias
     const that = this
     if (expandedRows.length) {
       that.expands = []
       if (row) {
         that.expands.push(row.objectId)
       }
     } else {
       that.expands = []
     }
   }

   private restSearch() {
     this.formDataSearch = {
       field101: undefined,
       field102: undefined,
       field104: undefined,
       field105: undefined,
       field106: undefined,
       field107: undefined,
       field108: undefined,
       fieldStatus: undefined
     }
   }
}
