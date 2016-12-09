QUnit.module ("king.container")
QUnit.test( "List", function( assert ) {
	var i,iter,val;
	var l = king.container.NewList();
	assert.equal(typeof(l),"object","NewList()");
	assert.ok(l.Empty(),"Empty()");
	assert.equal(l.Len(),0,"Len()");
	var n = 5;
	for (i = 0; i < n; i++) {
		l.PushBack(i + n);
		assert.equal(l.Len(),i + 1,"Len()");
		assert.notOk(l.Empty(),"Empty()");
	}
	for (i = 0; i < n; i++) {
		l.PushFront(n - i - 1);
		assert.equal(l.Len(),i + 1 + n,"Len()");
		assert.notOk(l.Empty(),"Empty()");
	}
	i=0;
	for(iter = l.Front();iter!=null;iter=iter.Next){
		assert.equal(i,iter.Value,"iterator");
		++i;
	}
	i=0;
	l.Do(function(iter){
		assert.equal(i,iter.Value,"Do");
		++i;
	});

	i = 9;
	for (iter = l.Back();iter!=null;iter=iter.Prev) {
		assert.equal(i,iter.Value,"r iterator");
		--i;
	}
	i = 9;
	l.DoReverse(function(iter){
		assert.equal(i,iter.Value,"DoReverse");
		--i;
	});

	l.PopFront();
	assert.ok(l.Len()==9 && l.Front().Value==1,"PopFront()");

	l.PopBack();
	assert.ok(l.Len()==8 && l.Back().Value==8,"PopFront()");

	l.Reset();
	assert.ok(l.Empty(),"Reset()");

	
	l.PushBack(0);
	l.PushBack(10);
	l.PushBack(1);
	l.PushBack(2);
	l.PushBack(3);

	l.Remove(l.Front().Next);
	i=0;
	l.Do(function(iter){
		assert.equal(i,iter.Value,"Remove m");
		++i;
	});

	l.Remove(l.Front());
	i=1;
	l.Do(function(iter){
		assert.equal(i,iter.Value,"Remove front");
		++i;
	});

	l.Remove(l.Back());
	i=1;
	l.Do(function(iter){
		assert.equal(i,iter.Value,"Remove front");
		++i;
	});
	assert.equal(i,3,"Remove front");

	//1 2
	l.Back().Value = 3;
	//1 3
	l.InsertBefore(0);
	l.InsertBefore(-1,l.Front());
	l.InsertBefore(2,l.Back());
	i=3;
	l.DoReverse(function(iter){
		assert.equal(i,iter.Value,"InsertBefore");
		--i;
	});
	assert.equal(i,-2,"InsertBefore");
	
	//-1 0 1 2 3
	l.Front().Value = -2;
	//-2 0 1 2 3
	l.InsertAfter(4);

	l.InsertAfter(5,l.Back());
	
	
	l.InsertAfter(-1,l.Front());
	i=-2;
	l.Do(function(iter){
		assert.equal(i,iter.Value,"InsertAfter");
		++i;
	});
	assert.equal(i,6,"InsertAfter");

});