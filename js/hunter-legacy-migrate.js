// The older split app used addition-named storage keys. Import only subtraction
// records, keep both source stores intact, and never replace an existing Hunter record.
(function() {
  if (storageLoadText('hikizan_legacy_import_v1','')==='1') return;
  var sources={gD:storageLoadJSON('tashizan_v2_gD',{}),kD:storageLoadJSON('tashizan_kD',{})};
  var gd=storageLoadJSON('hikizan_gD',{}),kd=storageLoadJSON('hikizan_kD',{}),backup={gD:{},kD:{}};
  Object.keys(sources.gD || {}).forEach(function(key){
    var match=/^(no|carry):(\d+)-(\d+)$/.exec(key),record=sources.gD[key];
    if(!match || !record || !Number.isFinite(record.att))return;
    var target=(match[1]==='carry'?'borrow':'no')+':'+match[2]+'-'+match[3];
    backup.gD[key]=record;if(!gd[target])gd[target]=record;
  });
  Object.keys(sources.kD || {}).forEach(function(key){
    var match=/^([nk])(\d+):(\d+)-(\d+)$/.exec(key),record=sources.kD[key];
    if(!match || !record || !Number.isFinite(record.att))return;
    var target='k'+(match[1]==='n'?'no':'borrow')+'_bottom_'+match[2]+':'+match[3]+'-'+match[4];
    backup.kD[key]=record;if(!kd[target])kd[target]=record;
  });
  if(Object.keys(backup.gD).length || Object.keys(backup.kD).length){
    storageSaveJSON('hikizan_legacy_records_backup_v1',backup);
    storageSaveJSON('hikizan_gD',gd);storageSaveJSON('hikizan_kD',kd);
  }
  storageSaveText('hikizan_legacy_import_v1','1');
})();
