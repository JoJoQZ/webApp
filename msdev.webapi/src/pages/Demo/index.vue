<script>
// 引入上面的接口文件
import INTERFACE from "./interface";
export default {
  data() {
    return {
      imageList: [],
      deleteList: []
    };
  },
  created() {
    // 获取列表 （调用封装好的请求）
    INTERFACE.getImageList().then(data => {
      if (data && data.data) this.imageList = data.data;
    });
  },
  methods: {
    // 确认删除
    handleDelete() {
      INTERFACE.deleteAgreement(this.deleteList).then(data => {
        // 操作成功提示 （上面定义好的全局提示）
        window.Tips("删除成功!");
      });
    }
  }
};
</script>