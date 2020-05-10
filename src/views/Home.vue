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
        
        //サムネイルから渡された動画のID
        var newVideoID = this.$route.params.videoID;

        var video_count = this.$store.state.home.video_count;
        var videos = this.$store.state.home.videos;
        //前回表示していた動画のID
        var videoID = videos[video_count].videoID;

        if(!(typeof newVideoID === "undefined")){
          //サムネイルから動画を選んでホーム画面に来た時
          //ホーム画面を更新する

          //動画の初期化
          this.$store.dispatch('home/init_video', newVideoID);
          //コメントの初期化
          this.$store.dispatch('home/init_comment', newVideoID);
        } else{
          //下のメニューから選んでホーム画面に来た時
          //ホーム画面を更新しない時

          //前回表示していた動画のコメントをセット
          this.$store.dispatch('home/init_comment', videoID);
        }
      }
    },
  }
</script>