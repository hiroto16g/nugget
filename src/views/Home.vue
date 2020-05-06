<template>
  <div>
    <HomePC class="pc"></HomePC>
    <HomeSP class="sp"></HomeSP>
  </div>
</template>

<script>
/* eslint-disable no-console */
  import HomePC from './HomePC.vue'
  import HomeSP from './HomeSP.vue'
  
  export default {
    name: 'home',
    components: {
      HomePC,
      HomeSP
    },
    mounted(){
      if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
        //統合モード
        
        //動画の初期化
        //var tmp_content_id = '1';
        var tmp_content_id = this.$route.params.content_id;
        this.$store.dispatch('home/init_video', tmp_content_id);

        //コメントの初期化
        var video_count = this.$store.state.home.video_count;
        var videos = this.$store.state.home.videos;
        var content_id = videos[video_count].content_id;
        if(tmp_content_id != videos[0].content_id){
          //ホーム画面を更新する時
          //コメントの初期化
          this.$store.dispatch('home/init_comment', tmp_content_id);
        } else{
          //ホーム画面を更新しない時
          //前回表示していた動画のコメントをセット
          this.$store.dispatch('home/init_comment', content_id);
        }
      }
    },
  }
</script>